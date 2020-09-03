import React from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginReq } from "../models/SignUp";
import { useForm } from "react-hook-form";
import { myUserService } from "../services/DataServices";

export function LoginForm() {

  const { register, handleSubmit } = useForm<LoginReq>();
  const history = useHistory();

  const onSubmit = (data: LoginReq) => myUserService.login(data).then(() => history.push('/dashboard'));

  return (
    <div>
      <h1 className="text-center text-white-100 m-5">Pokémon TCG Deckbuilder</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-white-100">Email:</label>
        <input type="text" name="email" ref={register({ required: true })} />
        <label className="text-white-100">Password:</label>
        <input type="password" name="password" ref={register({ required: true })} />
        <button className="btn btn-primary my-4 text-right" type="submit">Login</button>
      </form>
      <small className="text-white-100 block">Don't have an account? <Link to="/signup">Sign up.</Link></small>
    </div>
  )
}