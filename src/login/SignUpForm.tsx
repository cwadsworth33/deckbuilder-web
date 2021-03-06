import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignUpReq } from '../models/SignUp';
import { ServiceContext } from '../App';

export function SignUpForm() {

  const { register, handleSubmit, errors } = useForm<SignUpReq>();
  const { myUserService, toastService } = useContext(ServiceContext);
  const history = useHistory();

  const onSubmit = (data: SignUpReq) => myUserService.signUp(data)
    .then(res => {
      if (res.status === 200) {
        toastService.showSuccessToast(`Successfully created account for ${res.data.email}`);
        history.push('/');
      } else {
        toastService.showErrorToast(`User already exists.`);
      }
    })
    .catch(() => toastService.showErrorToast('Error creating user. Please try again later.'));

  return (
    <div className="container max-w-md">
      <h1 className="text-center text-white-100 m-5">Pokémon TCG Deckbuilder</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-white-100">First Name:</label>
        <input type="text" name="firstName" className="mb-2" ref={ register() } />
        <label className="text-white-100">Last Name:</label>
        <input type="text" name="lastName" className="mb-2" ref={ register() } />
        <div className="mb-2">
          <label className="text-white-100">Email:</label>
          <input type="text" name="email" ref={ register({ required: true }) } />
          { errors.email ? <div className="text-error">Email is required.</div> : null }
        </div>
        <div className="mb-2">
          <label className="text-white-100">Password:</label>
          <input type="password" name="password" ref={ register({ required: true }) } />
          { errors.password ? <div className="text-error">Password is required.</div> : null }
        </div>
        <button type="submit" className="btn btn-primary my-4 text-right">Sign Up</button>
      </form>
      <small className="text-white-100 block">Have an account? <Link to="/">Return to login.</Link></small>
    </div>
  )
}