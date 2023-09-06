const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/"; // 로그아웃 후 홈페이지로 리다이렉트
};

export default logout;