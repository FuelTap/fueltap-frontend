import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useNavigate } from 'react-router';

function LivenessCheck() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [cameraAccess, setCameraAccess] = useState(true);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const intervalRef = useRef(null);

  const stopRecording = () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  // 🎥 Start video recording
  const startRecording = async () => {
    try {
      setLoading(true);

      const streamData = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });

      setStream(streamData);

      // Attach stream to video element for live preview
      if (videoRef.current) {
        videoRef.current.srcObject = streamData;
        videoRef.current.muted = true;
        await videoRef.current.play();
      }

      const recorder = new MediaRecorder(streamData);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);

        // Stop showing the live feed
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      recorder.start();
      setRecording(true);
      setCountdown(10);
      toast.info('🎥 Recording started! Please face the camera.');

      // Countdown timer
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            if (recorder.state !== 'inactive') stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      setCameraAccess(false);
      toast.error(
        '⚠️ Unable to access camera. Please allow camera permissions.'
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelRecording = () => {
    stopRecording();
    setVideoUrl(null);
    setCountdown(10);
    toast.info('Recording cancelled.');
  };

  // ☁️ Upload liveness video
  const submitVideo = async () => {
    if (!videoUrl) return toast.error('No video to upload.');

    try {
      setLoading(true);
      const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
      const formData = new FormData();
      formData.append('video', blob, 'liveness.mp4');

      const response = await axiosPrivate.post('v1/kyc/liveness', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.status === 'success') {
        toast.success('✅ Liveness video uploaded successfully!');
        setVideoUrl(null);
        setCountdown(10);
        navigate('/success');
      } else {
        throw new Error(response.data?.message || 'Upload failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          '⚠️ Something went wrong while uploading. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      {/* 🟢 Video Circle */}
      <div
        className={`relative flex h-72 w-72 items-center justify-center overflow-hidden rounded-full border-4 border-dashed ${recording ? 'border-secondary' : 'border-gray-400'} bg-gray-100`}
      >
        {/* Always render <video>, control visibility via state */}
        <video
          ref={videoRef}
          className={`h-full w-full scale-x-[-1] rounded-full object-cover transition-all duration-300 ${
            recording ? 'opacity-100' : videoUrl ? 'opacity-0' : 'opacity-0'
          }`}
          autoPlay
          playsInline
        />

        {/* Placeholder when not recording or video ready */}
        {!recording && !videoUrl && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-600">
            {!cameraAccess && (
              <p className="mb-2 text-red-500">
                Camera access denied. Please allow camera permissions to
                proceed.
              </p>
            )}
            <p>Your face will appear here</p>
          </div>
        )}

        {/* Countdown timer during recording */}
        {recording && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-opacity-50 rounded-full bg-black p-4 text-4xl font-bold text-white">
              {countdown}
            </div>
          </div>
        )}

        {/* Recorded video preview */}
        {videoUrl && !recording && (
          <video
            src={videoUrl}
            controls
            className="absolute inset-0 h-full w-full rounded-full object-cover"
          />
        )}
      </div>

      <h2 className="text-primary text-2xl font-semibold">Liveness Check</h2>

      {/* Buttons */}
      <div className="flex w-full max-w-xs flex-col gap-3">
        {!recording && !videoUrl && (
          <Button
            onClick={startRecording}
            className="rounded-2xl"
            disabled={loading || !cameraAccess}
          >
            {loading
              ? 'Loading...'
              : !cameraAccess
                ? 'Camera Access Required'
                : "I'm Ready"}
          </Button>
        )}

        {recording && (
          <Button
            onClick={cancelRecording}
            variant="destructive"
            className="rounded-2xl bg-red-600"
          >
            Cancel Recording
          </Button>
        )}

        {videoUrl && !recording && (
          <div className="flex flex-col gap-3">
            <Button
              onClick={submitVideo}
              className="rounded-2xl bg-green-600 text-white"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Submit Video'}
            </Button>
            <Button
              onClick={() => {
                setVideoUrl(null);
                setCountdown(10);
              }}
              className="rounded-2xl"
              disabled={loading}
            >
              Redo Video
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LivenessCheck;
