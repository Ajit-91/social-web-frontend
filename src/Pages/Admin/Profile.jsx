import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RightProfileCard from '../../Components/Profile/RightProfileCard';
import { useParams } from 'react-router';
import { useSelector } from "react-redux"
import { selectUser } from '../../Redux/Slices/userSlice';
import { fetchUser } from '../../API/Auththentication';
import LeftProfileCard from '../../Components/Profile/LeftProfileCard';
import UpdateProfileForm from '../../Components/Profile/UpdateProfileForm';
import Loading from '../../Components/Loading';
import "../../pageStyles/profile.css"

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const localUser = useSelector(selectUser)
    const params = useParams()
    const [userDetails, setUserDetails] = useState({})
    const [updateProfile, setUpdateProfile] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const setDetails = async () => {
            const details = await fetchUser(params.userid)
            setUserDetails(details)
            setLoading(false)
        }
        setDetails()
    }, [params.userid, localUser, reload])

    return loading ? <Loading />  : (
            <div >
              <UpdateProfileForm updateProfile={updateProfile} setUpdateProfile={setUpdateProfile} localUser={localUser} />
                <Container className='mb-5'>
                    <Row className="gy-4">
                        {/* Left col */}
                        <Col lg={4}>
                            <LeftProfileCard userDetails={userDetails} setReload={setReload} />
                        </Col>
                        {/* Right col */}
                        <Col lg={8}>
                            <RightProfileCard userDetails={userDetails} setUpdateProfile={setUpdateProfile}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
};

export default Profile;
