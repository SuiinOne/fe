// 실제 서버 API가 없으므로, 임시로 mock 처리합니다.
export async function registerType(form: any) {
  // 실제로는 fetch 또는 axios로 서버에 POST 요청을 보냅니다.
  // 예시:
  // return axios.post('/api/registerType', form);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: form });
    }, 800);
  });
}
