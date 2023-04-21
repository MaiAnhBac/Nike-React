import Layout from "../components/Layout/Layout";
import axios from 'axios';
import {updateUser, getUser, updateUserInfo} from '../data/API'
import '../styles/Profile.css'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import AirplayIcon from '@mui/icons-material/Airplay';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import Skeleton from '@mui/material/Skeleton';
function Profile() {
	const userLogin = JSON.parse(localStorage.getItem('user')) || null
	const navigate = useNavigate();
	const [activeAccount, setActiveAccount] = useState(true);
	const [activePass, setActivePass] = useState(false);
	const [data, setData] = useState('')
    const [name, setName] = useState(data?.name)
    const [imageUser, setImageUser] = useState()
    const [loading, setLoading] = useState(true)
	const [EditAccount, setEditAccount] = useState(false);
	const [EditPass, setEditPass] = useState(false)
	const [password, setPassword] = useState('')
    const [changePassword, setChangePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
	const onPassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangePassword = (e) => {
        setChangePassword(e.target.value);
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
	const handleChangeName = (e) => {
        setName(e.target.value);
    }
	const onClickEditAccount = () => {
        setTimeout(() => {
            setEditAccount(!EditAccount)
        },500)
    }
	const onClickEditPass = () => {
        setTimeout(() => {
            setEditPass(!EditPass)
        },500)
    }
	const onActivedAccount = () => {
		setActiveAccount(true)
		setActivePass(false)
	}
	const onActivedPass = () => {
		setActivePass(true)
		setActiveAccount(false)
	}
	const handleChangeAvatar = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        async function uploadAvatar() {
            try {
              await axios
                    .post("https://api.escuelajs.co/api/v1/files/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        setImageUser(res?.data?.location)
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
            catch(error) {
                console.log(error);
            }
        }
        uploadAvatar();
    }
	const onClickSave = (e) => {
        e.preventDefault();
        const id = data.id;
            updateUserInfo(id,name, imageUser)
                .then((data) => {
                    setData(data)
                    setEditAccount(false)
                    toast.success('Successfully edited!');
                });
    }
	const onClickSavePassword = () => {
        const id = data.id;
        const pass = data.password;
        if(password === pass && changePassword != ""){
            if (changePassword === confirmPassword) {
                updateUser(id, changePassword)
                    .then((data) => {
                        toast.success('Change password successfully!');
                        setPassword('')
                        setConfirmPassword('')
                        setChangePassword('')
						setEditPass(false)
                        setTimeout(() => {
                            localStorage.removeItem('user')
                            localStorage.removeItem('cart')
                            navigate('/login')
                            toast.error('Please login again!');
                        },500)
                        
                    })
            }
            else {
                toast.error('Confirm password do not match!');
            }
        }
        else{
            toast.error('Old password is incorrect!');
        }
    }
	useEffect(() => {
        getUser(userLogin.id)
            .then((data) => {
                setData(data);
            })
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    },[])
    return (
        <Layout>
        <div className="container">
            {/* <h1 className="mb-5">Account Settings</h1> */}
            <div className="mb-flex">
                <div className="profile-tab-nav border-right">
                    <div className="profile-nav">
                        <div className="profile-nav-img">
                        {loading ? (<Skeleton className="skeleton-avatar" variant="circular" width={200} height={200} sx={{m: '0 auto'}} />) :
                            (<img src={data?.avatar} className="profile-img" />)}
                        </div>
                        {loading ? (<Skeleton className="skeleton-tilte" variant="text" width={150} height={50} sx={{m: '0 auto', mt: 1.5}} />) :
                        (<h4 className="profile-h4"> {data?.name} </h4>)}
                    </div>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className={`nav-link border-top active-link ${activeAccount ? "show" : ""}`} onClick={onActivedAccount} href="#account">
							<PersonIcon className="profile-icon" />
                            <p className="title-p">Account</p>
                        </a>
                        <a className={`nav-link active-link ${activePass ? "show" : ""} `} onClick={onActivedPass} href="#password">
                            <KeyIcon className="profile-icon" />
                            <p className="title-p">Password</p>
                        </a>
                        <a className="nav-link active-link"  data-toggle="pill" href="#" role="tab"  aria-selected="true">
                            <PrivacyTipIcon className="profile-icon" />
                            <p className="title-p">Security</p>
                        </a>
                        <a className="nav-link active-link" data-toggle="pill" href="#" role="tab"  aria-selected="true">
                            <AirplayIcon className="profile-icon" />
                            <p className="title-p">Application</p>
                        </a>
                        <a className="nav-link active-link" data-toggle="pill" href="#" role="tab"  aria-selected="true">
                            <NotificationsIcon className="profile-icon" />
                            <p className="title-p">Notification</p>
                        </a>
                    </div>
                </div>
                <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                    <div className={`tab-pane fade show ${activeAccount ? "actived" : ""}`}>
                        <h3 className="profile-h3-account"> Account Settings </h3>
                        <div className="row">
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">Name</label>
									{EditAccount ? (<input type="text" className="form-control" value={name} onChange={handleChangeName}/>) : 
								  	<input type="text" disabled className="form-control" value={data?.name || ""}/>}
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">Role</label>
								  	<input type="text" disabled className="form-control" value={data?.role || ""}/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">Email</label>
								  	<input type="text" disabled className="form-control" value={data?.email || ""}/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">Phone number</label>
								  	<input type="text" disabled className="form-control" value="+84 345478547"/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">Avatar</label>
									{EditAccount ? (<input type="file" className="form-control file" onChange={handleChangeAvatar} />) : 
								  		(<input type="file" disabled className="form-control file" />)}
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">Country</label>
								  	<input type="text" disabled className="form-control" value="Việt Nam"/>
								</div>
							</div>
						</div>
                        <div className="row-profile">
							{EditAccount ? 
							(<div>
								<button className="btn-profile btn-primary" onClick={onClickSave}>Update</button>
								<button className="btn-profile btn-light" onClick={onClickEditAccount} >Cancel</button>	
							</div>)
							: (<button className="btn-profile btn-primary" onClick={onClickEditAccount}>Edit</button>)}
						</div>
                    </div>
                    <div className={`tab-pane fade ${activePass ? "actived" : ""}`}>
						<h3 className="profile-h3-account">Password Settings</h3>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">Old password</label>
									{EditPass ? (<input type="password" className="form-control" value={password} onChange={onPassword}/>) : 
								  	(<input type="password" disabled className="form-control" value={data?.password || ""}/>)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">New password</label>
								  	{EditPass ? (<input type="password" className="form-control" value={changePassword} onChange={onChangePassword}/>) : 
								  	(<input type="password" disabled className="form-control" value="password" />)}
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
								  	<label className="label-title">Confirm new password</label>
								  	{EditPass ? (<input type="password" className="form-control" value={confirmPassword} onChange={onChangeConfirmPassword}/>) : 
								  	(<input type="password" disabled className="form-control" value="password"/>)}
								</div>
							</div>
						</div>
						<div className="row-profile">
							{EditPass ? 
							(<div>
								<button className="btn-profile btn-primary" onClick={onClickSavePassword}>Update</button>
								<button className="btn-profile btn-light" onClick={onClickEditPass} >Cancel</button>	
							</div>)
							: (<button className="btn-profile btn-primary" onClick={onClickEditPass}>Edit</button>)}
						</div>
					</div>
                </div>
            </div>
        </div>
        </Layout>
     );
}

export default Profile;