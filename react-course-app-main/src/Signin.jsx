import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';

function Signin() {
    return <div>
        <div style={{
            paddingTop: 200,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#eeeeee"
        }}>
            <Typography variant={"h5"}>
            Welcome Back to CourseMania!
            </Typography>

        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>

            <Card variant="outlined" style={{ width: 400, padding: 25 }}>

                <TextField fullWidth id={"username"} label="Username" variant="standard" />
                <br />
                <br />
                <TextField fullWidth id={"password"} label="Password" variant="standard" type={"password"} />
                <br />
                <br />
                <Button size='large' variant="contained">Sign In</Button>

            </Card>
        </div>
    </div>
}

export default Signin
