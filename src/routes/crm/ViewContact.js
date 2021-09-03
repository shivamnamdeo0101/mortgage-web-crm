import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import firebase from "../../base";
import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import {useHistory} from "react-router-dom";
import ProfileComp from "./ProfileComp";
import ContactProfileSection from "./ContactProfileSection";
import RightComp from "./RightComp";
import "./crm.css";

function ViewContact() {

	const {contact_id}  = useParams();
	const history = useHistory();

	return (
		<div className="dash">
				<Header />
				<div className="dash_board_grid">
					<NavBar />
					<div className="dash_board_main">
						<div className="route_name">
							<p>View Contact</p>
						</div>

						<div className="view_contact_grid">

							<div className="profile view_comp_grid view_scroll">
								<ProfileComp contact_id={contact_id}/>
							</div>
							<div className="contact_section view_comp_grid">
								<ContactProfileSection contact_id={contact_id}/>
							</div>

							<div className="activity_scetion view_comp_grid">
								<RightComp contact_id={contact_id} />
							</div>


						</div>
						
						

					</div>

				</div>

		</div>
	)
}

export default ViewContact