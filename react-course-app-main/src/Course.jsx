import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, TextField, Button } from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Course() {
    let { courseId } = useParams();
    const setCourses = useSetRecoilState(coursesState);

    console.log("course");

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



    return <div style={{ display: "flex", justifyContent: "center" }}>
        <CourseCard courseId={courseId} />
        <UpdateCard courseId={courseId} />
    </div>

}

function UpdateCard(props) {
    console.log("UpdateCard");
    const [title, setTtile] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const course = props.course;
    const [courses, setCourses] = useRecoilState(coursesState);



    return <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#eeeeee" }}>
        <Card variant="outlined" style={{ width: 400, padding: 25 }}>
            <Typography>Update Course Details</Typography>
            <TextField
                onChange={(e) => {
                    setTtile(e.target.value)
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
                    fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                        method: "PUT",
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
                            let updatedCourses = [];
                            for (let i = 0; i < courses.length; i++) {
                                if (courses[i].id == props.courseId) {
                                    updatedCourses.push({
                                        id: props.courseId,
                                        title: title,
                                        description: description,
                                        imageLink: image
                                    })
                                }
                                else {
                                    updatedCourses.push(courses[i]);
                                }
                            }
                            setCourses(updatedCourses);
                        })
                    })
                }}>
                Update Course</Button>
        </Card>
    </div>
}

function CourseCard(props) {
    const courses = useRecoilValue(coursesState);
    let course = null;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id == props.courseId) {
            course = courses[i];
        }
    }

    console.log("coursecard");

    if (!course) {
        return "loading..."
    }
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
    }}>
        <Typography textAlign={"center"} variant="h6">{course.title}</Typography>

        <br />
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <br />
        <img src={course.imageLink} style={{ width: 300 }} />
    </Card>

}



const coursesState = atom({
    key: 'coursesState',
    default: '',
});

export default Course

