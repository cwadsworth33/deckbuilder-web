import React from "react";

export function PreLoginLayout(props: any) {
  return (
    <div className="bg-blue-100 h-screen flex items-center justify-center">
      { props.children }
    </div>
  )
}