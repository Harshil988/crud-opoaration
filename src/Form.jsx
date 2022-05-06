import React, { useState } from 'react'
import swal from 'sweetalert';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


const initial = {
    name: "",
    phone: "",
    mail: "",
    dob: "",

}
export default function Form() {

    const [data, setData] = useState(false);
    const [record, setRecord] = useState([]);
    const [listData, setListData] = useState([]);
    const [arry, setArry] = useState(initial);
    const [errors, setErrors] = useState("");


    console.log("errors", errors)
    const changeevent = (event) => {

        const name = (event.target.name);
        const value = (event.target.value);
        setArry({ ...arry, [name]: value });
        if (event.target.name.trim()) {
            setErrors({ ...errors, [name]: "" });
        }
    };
    const click = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newuser = { ...arry };
            // console.log("newuser", newuser);
            localStorage.setItem("data", JSON.stringify(([...record, newuser])))
            setRecord([...record, newuser]);
            // console.log(record);
            setArry(initial);
        }
    }
    const remove = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const copyData = record;
                    copyData.splice(id, 1);
                    setArry(initial);
                    setData(false);
                    localStorage.setItem("data", JSON.stringify((copyData)));
                    setRecord([...copyData]);

                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });

    };

    const delate = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const copyData = record;
                    copyData.splice(0);
                    localStorage.setItem("data", JSON.stringify((copyData)));

                    setRecord([...copyData]);
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {

                    swal("Your imaginary file is safe!");
                }
            });


    };
    const dataedit = (list, index) => {
        // console.log("List", list);
        setArry(list);
        setListData(index);
        setData(true);


    };
    const finaledit = () => {
        const data = listData
        const newData = arry
        const copyData = record
        copyData[data] = {
            ...newData
        }
        localStorage.setItem("data", JSON.stringify((copyData)));
        setRecord(copyData)
        setData(false)
        // console.log("copyData", copyData);
        setArry(initial);
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};
        if (arry && !arry.name) {
            formIsValid = false;
            errors["name"] = "*Please enter username!";
        }

        if (arry && !arry.phone) {
            formIsValid = false;
            errors["phone"] = "*Please enter phone number!";
        }

        if (arry && !arry.mail) {
            formIsValid = false;
            errors["mail"] = "*Please enter email!";
        } else if (
            arry.mail &&
            !arry.mail.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            formIsValid = false;
            errors["mail"] = "*Please enter vaild email id!";
        }

        if (arry && !arry.dob) {
            formIsValid = false;
            errors["dob"] = "*Please enter date!";
        }
        setErrors(errors);
        return formIsValid;
    };


    return (

        <div>
            <form onSubmit={click}>
                <div className="m-3">
                    <div className='text-center border p-3 '>
                        <h4>
                            name :-
                            <input
                                className='m-1'
                                id="name"
                                type="text"
                                name="name"
                                placeholder="enter your name"
                                onChange={changeevent}
                                value={arry.name}
                            />
                        </h4>
                        <span className='text-danger'> {errors["name"]}</span>



                        <h4>
                            phone:-
                            <input
                                className=' m-1'
                                type="number"
                                name="phone"
                                placeholder="phone number"
                                onChange={changeevent}
                                value={arry.phone}
                            />
                        </h4>
                        <span className='text-danger'> {errors["phone"]}</span>

                        <h4>
                            email :-
                            <input
                                className=' m-1'
                                type="email"
                                name="mail"
                                placeholder="name123@gmail.com"
                                onChange={changeevent}
                                value={arry.mail}
                            />
                        </h4>
                        <span className='text-danger'> {errors["mail"]}</span>


                        <h4>
                            date :-
                            <input
                                className=' m-1'
                                type="date"
                                name="dob"
                                placeholder="date of birth"
                                onChange={changeevent}
                                value={arry.dob}
                            />
                        </h4>
                        <span className='text-danger'> {errors["dob"]}</span>


                        <div>
                            {
                                data ? <button className="btn btn-primary mt-3" onClick={finaledit} >save</button> :
                                    <button className="btn btn-success mt-3" type='submit'>submit</button>
                            }

                        </div>

                    </div>

                </div>
            </form>

            <button onClick={delate} className='btn btn-danger mt-2 '>all delate</button>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>no.</th>
                            <th>name</th>
                            <th>phone</th>
                            <th>dob</th>
                            <th>mail</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.dob}</td>
                                    <td>{item.mail}</td>

                                    <button onClick={() => dataedit(item, index)} className='btn btn-outline-secondary '>edit Data</button>
                                    <button onClick={() => remove(index)} className='btn btn-outline-danger'>remove</button>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}