const express = require('express');
const router = express.Router();
const {verifyAccessToken, refreshToken} =require('../JWT/Authorisation')
const {
createHome, updateHome,deleteHome, getHome,getSingleHome,
createAbout, updateAbout, deleteAbout, getAbout,getSingleAbout,
createService, updateService, deleteService, getService,getSingleService,
createContact, updateContact, deleteContact, getContact,getSingleContact,
createProject, updateProject, deleteProject, getProject,getSingleProject,
createMessage, getMessage


} = require('../Controllers/domController');
//home section
router.route('/api/home').post(verifyAccessToken, createHome).get(getHome);
router.route('/api/home/:id').put(verifyAccessToken, updateHome).delete(verifyAccessToken, deleteHome).get(verifyAccessToken, getSingleHome)
//about section
router.route('/api/about').post(verifyAccessToken,createAbout).get(getAbout);
router.route('/api/about/:id').put(verifyAccessToken,updateAbout).delete(verifyAccessToken,deleteAbout).get(verifyAccessToken,getSingleAbout)
//service section
router.route('/api/service').post(verifyAccessToken,createService).get(getService);
router.route('/api/service/:id').put(verifyAccessToken,updateService).delete(verifyAccessToken,deleteService).get(verifyAccessToken,getSingleService)
//projects section
router.route('/api/project').post(verifyAccessToken,createProject).get(getProject);
router.route('/api/project/:id').put(verifyAccessToken,updateProject).delete(verifyAccessToken,deleteProject).get(verifyAccessToken,getSingleProject)

//contact section
router.route('/api/contact').post(verifyAccessToken,createContact).get(getContact);
router.route('/api/contact/:id').put(verifyAccessToken,updateContact).delete(verifyAccessToken,deleteContact).get(verifyAccessToken, getSingleContact)

//messages
router.route('/api/message').post(createMessage).get(verifyAccessToken, getMessage);


module.exports = router;