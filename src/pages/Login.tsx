const Login = () =>{
    return(
        <div className="flex text-black">
            <div className="flex-0 h-0 md:flex-1 h-screen bg-login_mene bg-100 flex justify-center items-center">
                <img src="/assets/login_logo.png" width={300} alt="" />
            </div>
            <div className="flex-1 p-20 flex flex-col">
                <div className="flex items-center gap-4">
                    <img src="/assets/login_back.png" width={30} alt="" />
                    <span>返回</span>
                </div>
            </div>
        </div>
    )
};
export default Login;