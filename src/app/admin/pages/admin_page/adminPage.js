import AdminPageScss from './styles/adminPage.scss'
import React, {useState, useEffect} from "react";
import AddCinemaPopup from './components/addCinemaPopup'
import AddNewAdminAccountPopup from './components/addNewAdminAccountPopup'
import AddCinemaRoomToCinema from './components/addCinemaRoomToCinema'
import ShowAllCinemasPopup from './components/showAllCinemasPopup'
import ShowAllUsersPopup from "./components/showAllUsersPopup";
import UpdateCinema from "./components/updateCinema";

const AdminPage = () => {
    const [showCreateCinema, setShowCreateCinema] = useState(false)
    const [showCreateNewAdmin, setShowCreateNewAdmin] = useState(false)
    const [showAllCinemas, setShowAllCinemas] = useState(false)
    const [showAllUsers, setShowAllUsers] = useState(false)
    const [showAddCinemaRoomToCinema, setShowAddCinemaRoomToCinema] = useState(false)
    const [showUpdateCinema, setShowUpdateCinema] = useState(false)

    useEffect(() => {
        document.title = 'Movins | ADMIN system'
    }, [])

    return (
        <div className='admin-page'>
            <h1 className="admin-page__welcome-heading heading--secondary">
                Welcome admin, choose the option and manage your app
            </h1>
            <section className='menu-section'>
                <div className="row">
                    <div className="menu-section__option--odd col-1-of-3">
                        <h3 className="heading-tertiary">Create cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button--odd"
                                onClick={() => setShowCreateCinema(!showCreateCinema)}
                        >Create
                        </button>
                    </div>
                    <div className="menu-section__option col-1-of-3">
                        <h3 className="heading-tertiary">Create new admin account</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowCreateNewAdmin(!showCreateNewAdmin)}
                        >Create
                        </button>
                    </div>
                    <div className="menu-section__option--odd col-1-of-3">
                        <h3 className="heading-tertiary">Add cinema room to cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button--odd"
                                onClick={() => setShowAddCinemaRoomToCinema(!showAddCinemaRoomToCinema)}
                        >Add
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="menu-section__option col-1-of-3">
                        <h3 className="heading-tertiary">Show all cinemas</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowAllCinemas(!showAllCinemas)}
                        >Show
                        </button>
                    </div>
                    <div className="menu-section__option--odd col-1-of-3">
                        <h3 className="heading-tertiary">Show all users</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button--odd"
                                onClick={() => setShowAllUsers(!showAllUsers)}
                        >Show
                        </button>
                    </div>
                    <div className="menu-section__option col-1-of-3">
                        <h3 className="heading-tertiary">Update cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowUpdateCinema(!showUpdateCinema)}
                        >Update
                        </button>
                    </div>
                </div>
            </section>
            <AddCinemaPopup showCreateCinema={showCreateCinema} setShowCreateCinema={setShowCreateCinema}/>
            <AddNewAdminAccountPopup showCreateNewAdmin={showCreateNewAdmin}
                                     setShowCreateNewAdmin={setShowCreateNewAdmin}/>
            <ShowAllCinemasPopup showAllCinemas={showAllCinemas} setShowAllCinemas={setShowAllCinemas}/>
            <ShowAllUsersPopup showAllUsers={showAllUsers} setShowAllUsers={setShowAllUsers}/>
            <AddCinemaRoomToCinema showAddCinemaRoomToCinema={showAddCinemaRoomToCinema}
                                   setShowAddCinemaRoomToCinema={setShowAddCinemaRoomToCinema}/>
            <UpdateCinema showUpdateCinema={showUpdateCinema} setShowUpdateCinema={setShowUpdateCinema}/>
        </div>
    )
}

export default AdminPage
