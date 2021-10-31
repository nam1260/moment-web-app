import { useEffect } from "react";
import styled from "styled-components";

const Modal = styled.div`
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    background-color: #fff;
    border-radius: 40px;
    display: none;
    width: ${(props) => props.theme.width + "px"};
    height: ${(props) => props.theme.height + "px"};
    overflow: hidden;
    &.on {
        display: inline-block;
    }

    & > .footer {
        display: flex;
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 110px;
        bottom: 0px;
        line-height: 110px;
        text-align: center;
        & > div {
            flex: 1;
            font-size: 34px;
            font-weight: 500;
            letter-spacing: -0.34px;

            &.confirm {
                background-color: #ff723a;
                color: #fff;
            }

            &.cancel {
                background-color: #f0f0f0;
                color: #444444;
            }
        }
    }

    @media (max-width: 750px) {
        width: min(70vw, ${(props) => props.theme.width + "px"});
        height: min(
            ${(props) => props.theme.ratio * 70 + "vw"},
            ${(props) => props.theme.height + "px"}
        );

        & > .footer {
            height: min(11vw, 110px);
            line-height: min(11vw, 110px);

            & > div {
                font-size: min(5vw, 34px);
            }
        }
    }
`;

export default function MomentModal({
    contentComponent = <></>,
    onClickHandlerCancel = () => {},
    onClickHandlerConfirm = () => {},
    cancelText = "",
    confirmText = "",
    hasCancelButton = false,
    disabled = false,
    isOpen = false,
    width = 200,
    height = 200,
}) {
    const sizeTheme = {
        width,
        height,
        ratio: parseFloat((height / width).toFixed(2)),
    };

    useEffect(() => {
        const wrapper = document.getElementsByClassName("modal-wrapper")[0];
        if (isOpen) {
            wrapper.style.display = "block";
        } else {
            wrapper.style.display = "none";
        }
    }, [isOpen]);

    return (
        <>
            <Modal theme={sizeTheme} className={isOpen && "on"}>
                {[contentComponent]}

                {confirmText !== "" && (
                    <div className="footer">
                        {hasCancelButton && [
                            <div
                                onClick={onClickHandlerCancel}
                                className="cancel"
                            >
                                {cancelText}
                            </div>,
                        ]}
                        <div
                            onClick={!disabled && onClickHandlerConfirm}
                            className={`confirm ${!disabled && "disabled"}`}
                        >
                            {confirmText}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
