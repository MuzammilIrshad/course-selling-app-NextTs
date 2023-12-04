import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

interface courses{
    description:String | null
    title:String | null
    image:String | null
    _id:String | null
    price:String | null
}
function Courses() {
    const [courses, setCourses] = useState<courses[] | []>([]);

    const init = async () => {
        const response = await axios.get(`http:localhost:3000/admin/courses/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(response.data.courses)
    }

    useEffect(() => {
        init();
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.length > 0 && courses.map((course, index) => {
            return <div key={index}>
                <Course course={course} />
                </div>
                }
        )}
    </div>
}

export function Course({course}:{course:courses}) {
    const router = useRouter();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <Image alt="course" src={course.image as string} style={{width: 300}} />
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                router.push("/course/" + course._id);
            }}>Edit</Button>
        </div>
    </Card>

}

export default Courses;