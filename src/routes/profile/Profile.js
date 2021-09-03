import React from 'react';
import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import "../comp/comp.css";
import ProfileComp from "./ProfileComp";

function Profile() {
	return (
		<div className="dash">
				<Header />
				<div className="dash_board_grid">
					<NavBar />
					<div	className="dash_board_main">


						<div className="dash_menu_data">

							<div className="route_name">
								<p>PROFILE</p>
							</div>

						</div>

						<ProfileComp />

					</div>

				</div>
			
		</div>
	)
}

export default Profile