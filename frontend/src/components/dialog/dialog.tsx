import React, {
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Localization from "../map/map";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  title: string;
  location: string;
}

export interface IRef {
  handleClickOpen: (location: string) => void;
}

const FullScreenDialog = forwardRef<IRef, IProps>(
  ({ title, location }: IProps, ref: Ref<IRef>) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      handleClickOpen,
    }));

    return (
      <>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {title}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Salvar
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <Localization location={location} />
          </List>
        </Dialog>
      </>
    );
  }
);
export default FullScreenDialog;
