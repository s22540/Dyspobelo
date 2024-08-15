import React, { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { styled } from "@stitches/react";
import { useNavigate } from "react-router-dom";

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
});

const StyledLabel = styled(Label.Root, {
    flexGrow: 0,
    flexShrink: 0,
    fontSize: "16px",
    color: "#000",
    lineHeight: "25px",
    paddingRight: "1rem",
});

const StyledInputContainer = styled("div", {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
    "&:not(:last-child)": {
        marginRight: "12px",
    },
});

const StyledInput = styled("input", {
    all: "unset",
    display: "block",
    width: "20rem",
    boxSizing: "border-box",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    "&:focus": { borderColor: "black" },
});

const StyledButton = styled("button", {
    all: "unset",
    padding: "10px 20px",
    width: "60%",
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
    width: "60%",
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
                navigate("/main-analityk");
            } else {
                const errorText = await response.text();
                console.error("Login failed:", errorText);
                alert("Login failed: " + errorText);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Error logging in: " + error.message);
        }
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return (
        <StyledContainer>
            <StyledForm onSubmit={handleLogin}>
                <StyledTitle>Login analityk</StyledTitle>

                <StyledInputContainer>
                    <StyledLabel htmlFor="numerAnalityka">Login</StyledLabel>
                    <StyledInput
                        id="numerAnalityka"
                        name="numerAnalityka"
                        placeholder="numerAnalityka"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </StyledInputContainer>

                <StyledInputContainer>
                    <StyledLabel htmlFor="password">Password</StyledLabel>
                    <StyledInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </StyledInputContainer>

                <StyledButton type="submit">Zaloguj</StyledButton>
            </StyledForm>

            <StyledSecondaryButton onClick={handleBackToLogin}>Zaloguj jako dyspozytor</StyledSecondaryButton>
        </StyledContainer>
    );
};

export default LoginScreenAnalityk;