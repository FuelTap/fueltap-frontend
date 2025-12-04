export async function getWalletBalance(axios) {
  const response = await axios();
  console.log(response);
  return response;
}
