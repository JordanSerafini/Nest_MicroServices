import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import slilogo from "../../assets/sli-logo.png";
import url from "../../utils/url";
import Captcha from "../../components/captcha/Captcha";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false);

  // Accéder à l'état passé et récupérer le message si disponible
  const fromState = location.state as {
    from?: string;
    message?: string;
  } | null;
  const message = fromState?.message;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch(`${url.main}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data && data.message) {
          if (data.message.includes("bloqué")) {
            setErrorMessage(`Votre compte est bloqué. Réessayez plus tard.`);
          } else if (data.message.includes("Trop de tentatives")) {
            setErrorMessage(
              `Trop de tentatives de connexion infructueuses. Votre compte est temporairement bloqué.`
            );
          } else {
            setErrorMessage(
              data.message ||
              "Échec de la connexion. Vérifiez vos identifiants."
            );
          }
        } else {
          setErrorMessage("Échec de la connexion. Vérifiez vos identifiants.");
        }
        setLoginAttempt(loginAttempt + 1);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.userData,
          password: undefined,
          login_attempts: undefined,
          blocked_until: undefined,
          date_de_creation: undefined,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Failed to login:", error);
      setErrorMessage("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  useEffect(() => {
    if (loginAttempt >= 3) {
      setShowCaptcha(true);
    }
  }, [loginAttempt]);

  useEffect(() => {
    if (isCaptchaCorrect) {
      setShowCaptcha(false);
    }
  }, [isCaptchaCorrect]);


  return (
    <div className="bg-gray-light h-screen w-screen overflow-hidden flex items-center justify-center">
      <div className="flex items-center h-full w-full flex-col justify-evenly">
          <img
            src={slilogo}
            alt="SLI Logo"
            className="h-32 rounded-full w-7/10"
          />
        <div className="bg-white w-9.5/10 rounded-lg shadow-md p-4">
          {message && <p className="mb-4 text-red-500">{message}</p>}
          {errorMessage && (
            <p className="w-full mb-4 text-center text-red-600 text-xs font-bold">
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-9.5/10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 flex flex-col items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-9.5/10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={3}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Connexion
            </button>
          </form>
        </div>
        {showCaptcha && <Captcha setIsCaptchaCorrect={setIsCaptchaCorrect} />}
      </div>
    </div>
  );
}

export default Login;
