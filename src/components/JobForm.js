import {useState} from 'react';
import {useNavigate} from "react-router";
import {useCreateJob} from "../graphql/hooks";

function JobForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {createJob, loading, error} = useCreateJob()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const job = await createJob(title, description)
        console.log('should post a new job:', {title, description});
        console.log('job created:', job);
        navigate(`/jobs/${job.id}`);
    };
    if (error) {
        return <p>
            Sorry, something went wrong.
        </p>
    }
    return (
        <div>
            <h1 className="title">
                New Job
            </h1>
            <div className="box">
                <form>
                    <div className="field">
                        <label className="label">
                            Title
                        </label>
                        <div className="control">
                            <input className="input" type="text" value={title}
                                   onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Description
                        </label>
                        <div className="control">
                            <textarea className="textarea" rows={10} value={description}
                                      onChange={
                                          (event) => setDescription(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link" disabled={loading}
                                    onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JobForm;
