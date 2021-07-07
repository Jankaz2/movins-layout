import AdminPageScss from './styles/adminPage.scss'
import GridScss from '../../../utils/grid/grid.scss'

const AdminPage = () => {
    return (
        <div className='admin-page'>
            <h1 className="admin-page__welcome-heading heading--secondary">
                Welcome sir, choose the option and manage your app
            </h1>
            <section className='menu-section'>
                <div className="row">
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Create cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button">Create</button>
                    </div>
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Create new admin account</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button">Create</button>
                    </div>
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Add cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button">Create</button>
                    </div>
                </div>
                <div className="row">
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Create cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button">Create</button>
                    </div>
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Create new admin account</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button">Create</button>
                    </div>
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Add cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button">Create</button>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default AdminPage