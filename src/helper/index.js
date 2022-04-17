export const getHeader = () => {
  try {
    const headers = {
      Authorization:
        'Basic TGJUZVVFT2RpTEhhZzV4aUxpWDdPQ3ZFbmZNYTpiWVNtbFRBakxsVDJuWEc1SVh2QjNLRDdvVm9h',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    return headers;
  } catch (error) {
    return null;
  }
};
