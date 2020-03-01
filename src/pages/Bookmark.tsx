import React from "react";
import {observer, inject} from "mobx-react";
import IStore from "../interfaces/IStore";
import {Typography, Paper, TextField} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Add} from "@material-ui/icons";

@inject("bookmarkStore")
@observer
class Bookmark extends React.Component<IStore, object> {

    render() {
        const classes = this.props.classes;

        const options = [
            {
                title: "点击右侧查询按钮查询"
            },
            {
                title: "篮球"
            }
        ]

        return (
            <Paper className={classes.bookmarkBox}>
                <Typography variant={'h5'}>
                    <FormattedMessage id={"intl_bookmark_container_title"}/>
                </Typography>
                <div>
                    <Autocomplete
                        multiple
                        id="size-small-outlined-multi"
                        size="small"
                        options={options}
                        getOptionLabel={option => option.title}
                        getOptionDisabled={option => option.title === "点击右侧查询按钮查询"}
                        renderInput={params => (
                            <TextField {...params} variant="outlined" label="Size small" placeholder="Favorites"/>
                        )}
                    />
                </div>
                <div>
                </div>
            </Paper>
        )
    }
}

export default Bookmark;