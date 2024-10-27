const BASE_API_URL = process.env.THEMIS_URL

const Routes = {
  serveAudio: (filename: string) => `${BASE_API_URL}/serve-audio/${filename}`,
};

export default Routes;