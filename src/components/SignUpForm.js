import {useNavigate} from "react-router";
import {useState} from "react";
import {createUser} from "../graphql/queries";

function SignUpForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const companyId = "wvdB54Gqbdp_NZTXK9Tue"; //FIXME
        const user = await createUser({email, companyId, password});
        console.log('user created:', user);
        navigate(`/`);
    };
    return (
        <div>
            <h1 className="title">
                New User
            </h1>
            <div className="box">
                <form>
                    <div className="field">
                        <label className="label">
                            Email
                        </label>
                        <div className="control">
                            <input className="input" type="email" required value={email}
                                   onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password
                        </label>
                        <div className="control">
                            <input className="input" type="password" required value={password}
                                   onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default SignUpForm;