import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from 'react';

function Appbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                if (data.username) {
                    setUsername(data.username)
                }
            })
        })
    }, []);

    if (username) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4
        }}>
            <div>
                <Typography>Course Mania</Typography>
            </div>


            <div style={{ display: "flex" }}>
                <div>
                    <Typography>{username}</Typography>
                </div>
                <div style={{ marginRight: 10 }}>
                    <Button variant="contained" onClick={() => {
                        localStorage.setItem("token", null);
                        window.location = "/"
                    }}
                    >logout</Button>
                </div>
            </div>

        </div>
    }

    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4
    }}>
        <div>
            <Typography>Course Mania</Typography>
        </div>

        <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10 }}>
                <Button variant="contained" onClick={() => navigate("/signup")}>Sign Up</Button>
            </div>
            <div>
                <Button variant="contained" onClick={() => navigate("/login")}>Sign In</Button>
            </div>
        </div>

    </div>

}

export default Appbar