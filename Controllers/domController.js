
const {Home} = require('../Models/homeModel');
const {About} = require('../Models/aboutModel');
const {Service} = require('../Models/servicesModel');
const {Project} = require('../Models/projectsModel');
const {Contact, directContact} = require('../Models/contactModel');
const multer = require('multer');
const path = require('path');
const { error } = require('console');



//storage location
const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req, file, callback)=>{
        callback(null, Date.now() +'-'+ file.originalname)
    }
});

const upload = multer({
    storage:Storage
}).array('testImage', 3);
//single('testImage')
//home controller
const createHome = async(req, res)=>{
    try {
        upload(req, res, async(err)=>{
            const {hello, description, backgroundImage} = req.body;
            if(err){
                console.log(err)
            }
            
            else{
                const {files} = req;
                const filesArray = files.map((file)=> file.path);
                if(filesArray.length == 3){
                    const newHome = await Home.create({
                        hello:hello,
                        description:description,
                        backgroundImage:filesArray
                    }).then(()=>{
                        res.json({message:'Home created successfully'});
                    }).catch((error)=>{
                        console.log(error);
                    })
                }
                else{
                    res.json({message:'Upload three Images'})
                }
                
            }
        })
         
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }
    
}

const updateHome = async(req, res)=>{
    try {
        const {id}= req.params;
        
        upload(req, res, async(err)=>{
            const {hello, backgroundImage, description} = req.body;
            if(err){
                console.log(err);
            }
            else{
                const {files} = req;
                const filesArray = files.map((file)=> file.path);
                const updateHome = await Home.findOneAndUpdate({_id:id}, {
                    hello:hello,
                    backgroundImage:filesArray,
                    description:description
                })
                res.json({message:'updated successfully', updateHome:updateHome});
            }
        })
       
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

const deleteHome = async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteHome = await Home.findOneAndDelete({_id:id});

        res.json({message:'deleted successfully'})
        
    } catch (error) {
        res.sendStatus(400);
        
    }
}

const getHome = async(req, res)=>{
    try {
        const home = await Home.find();
        res.json({home:home})
    } catch (error) {
        res.sendStatus(400)
    }
}
const getSingleHome = async(req, res)=>{
    const {id}= req.params;
    try {
        const home = await Home.findOne({_id:id});
        res.json({home:home})
    } catch (error) {
        res.sendStatus(400)
    }
}

//ABOUT CONTROLLER
const uploaadImage = multer({
    storage:Storage
}).single('upload');
const createAbout = async(req, res)=>{
    try {
        uploaadImage(req, res, async(err)=>{
            const {about_description, about_skills, about_image, about_title} = req.body;
            if(err){
                console.log(err)
            }
            else{
    
                const newAbout = await About.create({
                    about_title:about_title,
                    about_description:about_description,
                    about_skills:about_skills,
                    about_image:req.file.path
        
                });
                res.json({message:'About created successfully'});

            }
        })
        
        

        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }
    
}

const updateAbout = async(req, res)=>{
    try {
        const {id}= req.params;
        
        uploaadImage(req, res, async(err)=>{
            const {about_description, about_skills, about_title} = req.body;
            if(err){
                console.log(err);
            }else{
                const updateAbout = await About.findOneAndUpdate({_id:id}, {
                    about_title:about_title,
                    about_description:about_description,
                    about_skills:about_skills,
                    about_image:req.file.path
                })
                res.json({message:'updated successfully', updateAbout:updateAbout});
            }
        })
    
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

const deleteAbout = async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteAbout = await About.findOneAndDelete({_id:id});

        res.json({message:'deleted successfully'})
        
    } catch (error) {
        res.sendStatus(400);
        
    }
}

const getAbout = async(req, res)=>{
    try {
        const about = await About.find();
        res.json({about:about})
    } catch (error) {
        res.sendStatus(400)
    }
}

const getSingleAbout = async(req, res)=>{
    const {id}= req.params;
    try {
        const about = await About.findOne({_id:id});
        res.json({about:about})
    } catch (error) {
        res.sendStatus(400)
    }
}

//SERVICES CONTROLLER
const createService = async(req, res)=>{
    const {service_description, service_icon, service_title} = req.body;
    try {
        
        const newService = await Service.create({
            service_title,
            service_description,
            service_icon
        });

        res.json({message:'Service created successfully', newService:newService});
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }
    
}

const updateService = async(req, res)=>{
    try {
        const {id}= req.params;
        const {service_description, service_icon, service_title} = req.body;
        const updateService = await Service.findOneAndUpdate({_id:id}, {
            service_title,
            service_description,
            service_icon
        })
        res.json({message:'updated successfully', updateService:updateService});
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

const deleteService = async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteService = await Service.findOneAndDelete({_id:id});

        res.json({message:'deleted successfully'})
        
    } catch (error) {
        res.sendStatus(400);
        
    }
}

const getService = async(req, res)=>{
    try {
        const service = await Service.find();
        res.json({service:service})
    } catch (error) {
        res.sendStatus(400)
    }
}

const getSingleService = async(req, res)=>{
    const {id}= req.params;
    try {
        const service = await Service.findOne({_id:id});
        res.json({service:service})
    } catch (error) {
        res.sendStatus(400)
    }
}

//PROJECTS CONTROLLER

const createProject = async(req, res)=>{
    
    try {
        uploaadImage(req, res, async(err)=>{
            const {project_link, project_title} = req.body;
            if(err){
                console.log(err)
            }else{
                const newProject = await Project.create({
                    project_title:project_title,
                    project_image:req.file.path,
                    project_link:project_link
                });
                res.json({message:'Project created successfully'});
            }
        })
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }
    
}

const updateProject = async(req, res)=>{
    try {
        const {id}= req.params;
        
        uploaadImage(req, res, async(err)=>{
            const {project_image,project_title, project_link} = req.body;
            if(err){
                console.log(err)
            }else{
                const updateProject = await Project.findOneAndUpdate({_id:id}, {
                    project_image:req.file.path,
                    project_link:project_link,
                    project_title:project_title
                })
                res.json({message:'updated successfully', updateProject:updateProject});
            }
           
        })
       
        
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

const deleteProject = async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteProject = await Project.findOneAndDelete({_id:id});

        res.json({message:'deleted successfully'})
        
    } catch (error) {
        res.sendStatus(400);
        
    }
}

const getProject = async(req, res)=>{
    try {
        const project = await Project.find();
        res.json({project:project})
    } catch (error) {
        res.sendStatus(400)
    }
}

const getSingleProject = async(req, res)=>{
    const {id}= req.params;
    try {
        const project = await Project.findOne({_id:id});
        res.json({project:project})
    } catch (error) {
        res.sendStatus(400)
    }
}


//CONTACTS CONTROLLER
const createContact = async(req, res)=>{
    const {contact_description, contact_icon, contact_title , contact_link} = req.body;
    try {
        
        const newContact = await Contact.create({
            contact_title,
            contact_description,
            contact_icon,
            contact_link
        });

        res.json({message:'Contact created successfully', newContact:newContact});
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }
    
}

const updateContact = async(req, res)=>{
    try {
        const {id}= req.params;
        const {contact_description, contact_icon, contact_title , contact_link} = req.body;
        const updateContact = await Contact.findOneAndUpdate({_id:id}, {
            contact_title,
            contact_description,
            contact_icon,
            contact_link
        })
        res.json({message:'updated successfully', updateContact:updateContact});
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

const deleteContact = async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteContact = await Contact.findOneAndDelete({_id:id});

        res.json({message:'deleted successfully'})
        
    } catch (error) {
        res.sendStatus(400);
        
    }
}

const getContact = async(req, res)=>{
    try {
        const contact = await Contact.find();
        res.json({contact:contact})
    } catch (error) {
        res.sendStatus(400)
    }
}

const getSingleContact = async(req, res)=>{
    const {id}= req.params;
    try {
        const contact = await Contact.findOne({_id:id});
        res.json({contact:contact})
    } catch (error) {
        res.sendStatus(400)
    }
}

//direct contact
const createMessage = async(req, res)=>{
    const {username, email, message } = req.body;
    try {
        
        const newMessage = await directContact.create({
            username,
            email,
            message
        });

        res.json({message:'Message created successfully', newMessage:newMessage});
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }
    
}

const getMessage = async(req, res)=>{
    try {
        const messages = await directContact.find();
        res.json({messages:messages})
    } catch (error) {
        res.sendStatus(400)
    }
}





module.exports = {
    createHome, updateHome, deleteHome, getHome,getSingleHome,
    createAbout, updateAbout, deleteAbout, getAbout,getSingleAbout,
    createService, updateService, deleteService, getService,getSingleService,

    createContact, updateContact, deleteContact, getContact,getSingleContact,
    createMessage,getMessage,
    createProject, updateProject, deleteProject, getProject,getSingleProject

}