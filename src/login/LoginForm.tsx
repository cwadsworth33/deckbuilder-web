import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginReq } from "../models/SignUp";
import { useForm } from "react-hook-form";
import { ServiceContext } from "../App";
import { classNameUtil } from "../utils";

export function LoginForm() {

  const { register, handleSubmit, errors } = useForm<LoginReq>();
  const { myUserService, toastService } = useContext(ServiceContext);
  const history = useHistory();

  const onSubmit = (data: LoginReq) => myUserService.login(data)
    .then(() => history.push('/dashboard'))
    .catch(() => toastService.showErrorToast('Failed to login.'));

  return (
    <div>
      <h1 className="text-center text-white-100 m-5">Pokémon TCG Deckbuilder</h1>
      <h3 className="text-center text-white-100 m-5">This is a dev server. Please do not enter any sensitive information.</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="text-white-100">Email:</label>
          <input type="text" name="email" ref={register({ required: true })} className={classNameUtil('mb-1', {'border-error': errors.email})}/>
          { errors.email ? <div className="text-error">Email is required.</div> : null }
        </div>
        <div>
          <label className="text-white-100">Password:</label>
          <input type="password" name="password" ref={register({ required: true })} className="mb-1" />
          { errors.password ? <div className="text-error">Password is required.</div> : null }
        </div>
        <button className="btn btn-primary my-4 text-right" type="submit">Login</button>
      </form>
      <small className="text-white-100 block">Don't have an account? <Link to="/signup">Sign up.</Link></small>
      <small className="text-white-100 block cursor-pointer">
        <a onClick={() => onSubmit({email: 'GUEST', password: 'password'})}>Alternatively, <span className="underline">Sign in as guest</span>.</a>
      </small>
    </div>
  )
}