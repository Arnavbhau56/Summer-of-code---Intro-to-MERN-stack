import { useEffect, useState } from "react";
import { Card, Typography } from '@mui/material';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                setCourses(data.courses);
            })
        })
    }, [])
    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

        {courses.map(course => {
            return <Course course={course} />
        })}
    </div>
}

function Courses(/*props*/) {
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
    }}>
        <Typography textAlign={"center"} variant="h6">{props.course.title}</Typography>

        <br />
        <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
        <br />
        <img src={props.course.imageLink} style={{ width: 300 }} />
    </Card>
}

export default Courses;
