import React, { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { styled } from "@stitches/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#F0F2F5",
});

const StyledForm = styled("form", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "300px",
});

const StyledTitle = styled("h1", {
    color: "#000",
    fontSize: "32px",
    margin: "0 0 24px",
    textAlign: "center",
    width: "100%",
});

const StyledLabel = styled(Label.Root, {
    flexGrow: 0,
    flexShrink: 0,
    fontSize: "16px",
    color: "#000",
    lineHeight: "25px",
    paddingRight: "1rem",
    width: "100px",
    textAlign: "right",
});

const StyledInputContainer = styled("div", {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
    "&:not(:last-child)": {
        marginRight: "12px",
    },
    justifyContent: "space-between",
    width: "100%",
});

const StyledInput = styled("input", {
    all: "unset",
    display: "block",
    width: "calc(100% - 110px)",
    boxSizing: "border-box",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    "&:focus": { borderColor: "black" },
});

const StyledButton = styled("button", {
    all: "unset",
    padding: "10px 20px",
    width: "auto",
    borderRadius: "4px",
    backgroundColor: "#000",
    color: "white",
    fontSize: "16px",
    marginTop: "10px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#333",
    },
});

const StyledSecondaryButton = styled("button", {
    all: "unset",
    padding: "10px 20px",
    width: "auto",
    borderRadius: "4px",
    backgroundColor: "#000",
    color: "white",
    fontSize: "16px",
    marginTop: "20px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#333",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "300px",
});

const LoginScreenAnalityk = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginDetails = {
            numer_Analityka: username,
            Zahashowane_Haslo: password
        };

        try {
            const response = await fetch('http://localhost:5126/api/auth/login-analityk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginDetails)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful, id_analityk received:", data);
                localStorage.setItem('id_analityk', data.id_analityk);
                navigate("/wygeneruj-raport");
            } else {
                const errorText = await response.text();
                console.error("Login failed:", errorText);
                alert(t("Login failed: ") + errorText);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(t("Error logging in: ") + error.message);
        }
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return (
        <StyledContainer>
            <StyledForm onSubmit={handleLogin}>
                <StyledTitle>{t("Login analityk")}</StyledTitle>

                <StyledInputContainer>
                    <StyledLabel htmlFor="numerAnalityka">{t("Login")}</StyledLabel>
                    <StyledInput
                        id="numerAnalityka"
                        name="numerAnalityka"
                        placeholder={t("Numer analityka")}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </StyledInputContainer>

                <StyledInputContainer>
                    <StyledLabel htmlFor="password">{t("Hasło")}</StyledLabel>
                    <StyledInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </StyledInputContainer>

                <StyledButton type="submit">{t("Zaloguj")}</StyledButton>
            </StyledForm>

            <StyledSecondaryButton onClick={handleBackToLogin}>{t("Zaloguj jako dyspozytor")}</StyledSecondaryButton>
        </StyledContainer>
    );
};

export default LoginScreenAnalityk;