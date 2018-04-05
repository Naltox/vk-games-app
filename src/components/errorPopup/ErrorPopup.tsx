import * as React from 'react'
import Flex from "../../uikit/components/flex/Flex";
import Button from "../../uikit/components/input/button/Button";
import PopupBox from "../../uikit/components/popupBox/PopupBox";
import Block from "../../uikit/components/block/Block";
import TextView from "../../uikit/components/textView/TextView";

interface ErrorPopupProps {
    errorText: string
    onClose()
}

export const ErrorPopup: React.SFC<ErrorPopupProps> = props => {
    return (
       <PopupBox
           title="Ошибка"
           onClose={props.onClose}
           body={
               <Flex align="center" justify="center">
                   <TextView>{props.errorText}</TextView>
               </Flex>
           }
           bottom={
               <Block float="right">
                   <Button
                       text="Закрыть"
                       minWidth={100}
                       onClick={props.onClose}
                   />
               </Block>
           }
       />
    )
}