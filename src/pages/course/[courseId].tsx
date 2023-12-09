import { Card, Grid } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react"
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import {Loading} from "../../components/Loading";
// import { BASE_URL } from "../config.js";
import { courseState } from "../../store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseImage } from "../../store/selectors/course";
import Image from "next/image";
import { useRouter } from "next/router";

function Course() {
const router = useRouter();
  const { courseId } = router.query;  
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);

    useEffect(() => {
        axios.get(`/api/admin/course/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse({isLoading: false, course: res.data.course});
        })
        .catch(e => {
            setCourse({isLoading: false, course: {_id:null, title:null, price:null, image:null, description:null}});
        });
    }, []);

    if (courseLoading) {
        return <Loading />
    }

    return <div>
        <GrayTopper />
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard />
            </Grid>
        </Grid>
    </div>
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard() {
    const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState<String | null>(courseDetails.course.title);
    const [description, setDescription] = useState<String | null>(courseDetails.course.description);
    const [image, setImage] = useState<String | null>(courseDetails.course.image);
    const [price, setPrice] = useState<String | null>(courseDetails.course.price);

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card variant={"outlined"} sx={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update course details</Typography>
            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
            <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />

            <Button
                variant="contained"
                onClick={async () => {
                    axios.put(`/api/admin/courses/` + courseDetails.course._id, {
                        title: title,
                        description: description,
                        imageLink: image,
                        published: true,
                        price
                    }, {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    let updatedCourse = {
                        _id: courseDetails.course._id,
                        title: title,
                        description: description,
                        image: image,
                        price:price
                    };
                    setCourse({course: {...updatedCourse}, isLoading: false});
                }}
            > Update course</Button>
        </div>
    </Card>
</div>
}

function CourseCard() {
    const title = useRecoilValue(courseTitle);
    const image = useRecoilValue(courseImage);

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <Image alt="course" src={image as string} style={{width: 350}} />
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{title}</Typography>
            <Price />
        </div>
    </Card>
    </div>
}

function Price() {

    const price = useRecoilValue(coursePrice);
    return <>
        <Typography variant="subtitle2" style={{color: "gray"}}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>
    </>
}

export default Course;