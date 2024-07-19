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

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginDetails = {
            numer_Dyspozytora: username,
            Zahashowane_Haslo: password
        };

        try {
            const response = await fetch('http://localhost:5126/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginDetails)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful, id_dyspozytor received:", data);
                localStorage.setItem('id_dyspozytor', data.id_dyspozytor);
                navigate("/main");
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

    return (
        <StyledContainer>
            <StyledForm onSubmit={handleLogin}>
                <StyledTitle>Login</StyledTitle>

                <StyledInputContainer>
                    <StyledLabel htmlFor="numerDyspozytora">Login</StyledLabel>
                    <StyledInput
                        id="numerDyspozytora"
                        name="numerDyspozytora"
                        placeholder="numerDyspozytora"
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

                <StyledButton type="submit">Log In</StyledButton>
            </StyledForm>
        </StyledContainer>
    );
};

export default LoginScreen;