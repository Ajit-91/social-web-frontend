import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RightProfileCard from '../../Components/Profile/RightProfileCard';
import "../../pageStyles/profile.css"
// import { useRef } from 'react';
import { Link } from "react-router-dom"
import { useParams } from 'react-router';
import { useSelector } from "react-redux"
import { selectUser } from '../../Redux/Slices/userSlice';
import { fetchUser } from '../../API/Auththentication';
import LeftProfileCard from '../../Components/Profile/LeftProfileCard';
import UpdateProfileForm from '../../Components/Profile/UpdateProfileForm';

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const localUser = useSelector(selectUser)
    const params = useParams()
    const [userDetails, setUserDetails] = useState({})
    const [updateProfile, setUpdateProfile] = useState(false)

    useEffect(() => {
        const setDetails = async () => {
            if (params.userid === JSON.parse(localStorage.getItem("user"))) {
                setUserDetails(localUser)
                setLoading(false)
            } else {
                const details = await fetchUser(params.userid)
                setUserDetails(details)
                setLoading(false)
            }
        }
        setDetails()
    }, [params.userid, localUser])

    return loading ? <h1>loading...</h1>
        : (
            <div >
              <UpdateProfileForm updateProfile={updateProfile} setUpdateProfile={setUpdateProfile} localUser={localUser} />
                <Container className='mb-5'>
                    <Row className="gy-4">
                        {/* Left col */}
                        <Col lg={4}>
                            <LeftProfileCard userDetails={userDetails} />
                        </Col>
                        {/* Right col */}
                        <Col lg={8}>
                            <RightProfileCard userDetails={userDetails} setUpdateProfile={setUpdateProfile}/>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center", display: "block" }}>
                        <Link to="/myPosts" >See all posts</Link>
                    </div>
                </Container>
            </div>
        )
};

export default Profile;
