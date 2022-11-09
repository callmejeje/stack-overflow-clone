import { useState } from 'react';

import axios from 'axios';
import { AiFillTags, AiFillTrophy } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook } from 'react-icons/gr';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { SiGithub } from 'react-icons/si';
import { TbTriangle } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { Container, SignupBlock } from './style';
const URL = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [nameValidMsg, setNameValidMsg] = useState('');
  const [emailValidMsg, setEmailValidMsg] = useState('');
  const [passwordValidMsg, setPasswordValidMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (displayName.length === 0) {
      setNameValidMsg('displayName cannot be empty.');
      return;
    } else if (displayName.length > 15 || displayName.length < 4) {
      setNameValidMsg('The displayName is not a valid displayName.');
      return;
    } else if (email.length === 0) {
      setEmailValidMsg('Email cannot be empty.');
      return;
    } else if (!(email.includes('@') && email.includes('.'))) {
      console.log('이메일 유효성검사: @랑 .이 없음');
      setEmailValidMsg('The email is not a valid email address.');
      return;
    } else if (password.length === 0) {
      setPasswordValidMsg('Password cannot be empty.');
      return;
    } else if (password.length > 20) {
      console.log('비밀번호 유효성검사: 20자 미만');
      setPasswordValidMsg('The password is not a valid password.');
      return;
    }
    return axios
      .post(`${URL}/api/sign-up`, {
        displayName: displayName,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res) {
          navigate('/login');
        }
      })
      .catch((error) => {
        if (error.response.data === '형식에 맞지 않음') {
          setNameValidMsg('The displayName is not a valid displayName.');
        }
        if (error.response.data === '크기가 8에서 20 사이여야 합니다') {
          setNameValidMsg('The displayName is not a valid displayName.');
        } else if (
          error.response.data === '올바른 형식의 이메일 주소여야 합니다'
        ) {
          setEmailValidMsg('The email is not a valid email address.');
        } else if (
          error.response.data ===
          '"^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]*$"와 일치해야 합니다'
        ) {
          setPasswordValidMsg('The password is not a valid password.');
        }
      });
  };

  return (
    <Container>
      <div className="signup_ad">
        <h2>Join the Stack Overflow community</h2>
        <div>
          <RiQuestionAnswerFill className="icons" />
          Get unstuck — ask a question
        </div>
        <div>
          <TbTriangle className="icons" />
          Unlock new privileges like voting and commenting
        </div>
        <div>
          <AiFillTags className="icons" />
          Save your favorite tags, filters, and jobs
        </div>
        <div>
          <AiFillTrophy className="icons" />
          Earn reputation and badges
        </div>
      </div>
      <SignupBlock className="">
        <section className="social_signup">
          <div>
            <button>
              <FcGoogle className="icons" size={22} />
              <span>Sign up with Google</span>
            </button>
            <button>
              <SiGithub className="icons" size={22} />
              Sign up with Github
            </button>
            <button>
              <GrFacebook className="icons" size={20} />
              Sign up with Facebook
            </button>
          </div>
        </section>
        <section className="email_signup">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="displayName">Display name</label>
              <input
                type="text"
                htmlFor="displayName"
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              ></input>
              {nameValidMsg ? <div className="msg">{nameValidMsg}</div> : ''}
            </div>
            <div>
              <label htmlFor={'Email'}>Email</label>
              <input
                type="text"
                htmlFor="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              {emailValidMsg ? <div className="msg">{emailValidMsg}</div> : ''}
            </div>
            <div>
              <label htmlFor={'password'}>Password</label>
              <input
                name="password"
                type="password"
                htmlFor="password"
                autoComplete="on"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              {passwordValidMsg ? (
                <div className="msg">{passwordValidMsg}</div>
              ) : (
                ''
              )}
            </div>
            <button className="signup_btn">Sign up</button>
          </form>
        </section>
        <div className="signup_guide">
          <div>
            Already have an account?
            <Link to="/login">Log in</Link>
          </div>
          <br></br>
          <div>
            Are you an employer?
            <a href="https://talent.stackoverflow.com/users/login">
              Sign up on Talent
            </a>
          </div>
        </div>
      </SignupBlock>
    </Container>
  );
};
export default Signup;
