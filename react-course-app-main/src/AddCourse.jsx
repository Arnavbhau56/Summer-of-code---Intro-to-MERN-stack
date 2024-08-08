import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card, Typography } from '@mui/material';
import { useState } from 'react';

function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    return <div style={{ display: "flex", justifyContent: "center", marginTop: 300, backgroundColor: "#eeeeee" }}>
        <Card variant="outlined" style={{ width: 400, padding: 25 }}>
            <TextField
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="standard"
            />


            <TextField
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="standard"
            />

            <TextField
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image Link"
                variant="standard"
            />


            <Button size='large'
                variant="contained"
                onClick={() => {
                    fetch("http://localhost:3000/admin/courses", {
                        method: "POST",
                        body: JSON.stringify({
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true
                        }),
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).then((res) => {
                        res.json().then((data) => {
                            console.log(data);
                            alert("Course Added");
                        })
                    })
                }}>
                AddCourse</Button>
        </Card>
    </div>
}

export default AddCourse;