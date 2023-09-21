import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Wrapper = styled.div<{ open: boolean }>(({ open }) => ({
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '.25s',
    position: 'fixed',
    bottom: 0,
    right: 0,
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 16px',
    color: 'white',
    minWidth: '288px',
    margin: '0 1rem 1rem 0',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(50,50,50)',
    borderRadius: '4px',
    fontSize: '14px',
    ...(open && {
        opacity: '.99',
    }),
}));

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 0px;
`;

const CloseIcon = styled.div`
    margin-left: auto;
    cursor: pointer;
`;

const Toast = (props: ToastProps) => {
    const { message, open, onClose, autoHideDuration = 6000, showCloseIcon = false } = props;

    useEffect(() => {
        if (open) {
            const timeout = setTimeout(() => {
                onClose && onClose();
            }, autoHideDuration);

            return () => clearTimeout(timeout);
        }
    }, [open, autoHideDuration, onClose]);

    return (
        <Wrapper open={open}>
            <MessageContainer>{message}</MessageContainer>
            {showCloseIcon && <CloseIcon onClick={onClose}>x</CloseIcon>}
        </Wrapper>
    );
};

type ToastProps = {
    message: string;
    open: boolean;
    autoHideDuration?: number;
    onClose?: () => void;
    showCloseIcon?: boolean;
};

export { Toast };
