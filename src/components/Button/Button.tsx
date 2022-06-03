import React from 'react';
import './_index.scss';

interface IButtonProps{
    className?:string,
    onClick:any,
    children:any
}

const Button = (props:IButtonProps) => {
    return (
        <button
            className={`btn ${props.className}`}
            onClick={() => props.onClick && props.onClick()}
        >
            {props.children}
        </button>
    );
}

export const OutlineButton = (props:IButtonProps) => {
    return (
        <Button
            className={`btn-outline ${props.className}`}
            onClick={() => props.onClick && props.onClick()}
        >
            {props.children}
        </Button>
    );
}