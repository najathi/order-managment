import AuthLayoutWrapper from "@/components/auth/authLayoutWrapper";
import Login from "@/components/auth/loginForm";

const Home = function Home() {
  return (
    <AuthLayoutWrapper>
      <Login />
    </AuthLayoutWrapper>
  );
}

export default Home;
