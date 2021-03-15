import React,{ useState, useEffect} from 'react';
import axios from 'axios';

function AccountScreen(){

	const [accScreen, setAccScreen] = useState(false);
	const [data, setData] = useState({});
	
	const [profile, setProfile] = useState(null);

	const [firstname, setFirstname] = useState('');
	const [settingFirstname, setSettingFirstname] = useState(false);

	const [lastname, setLastname] = useState('');
	const [settingLastname, setSettingLastname] = useState(false);
	
	const [email, setEmail] = useState('');
	const [settingEmail, setSettingEmail] = useState(false);

	
	const [shopName, setShopName] = useState('');
	const [settingShopName, setSettingShopName] = useState(false);
	
	const [openTime, setOpenTime] = useState('');
	const [settingOpenTime, setSettingOpenTime] = useState(false);
	
	const [closeTime, setCloseTime] = useState('');
	const [settingCloseTime, setSettingCloseTime] = useState(false);
	
	const [priceType, setPriceType] = useState('');
	const [settingPriceType, setSettingPriceType] = useState(false);
	
	const [desc, setDesc] = useState('');
	const [settingDesc, setSettingDesc] = useState(false);
	
	const [changeShopType, setChangeShopType] = useState(false);
	
	const [shopCatagories, setShopCatagories] = useState('');
	
	const [mainImage, setMainImage] = useState(null);
	
	const [searchName, setSearchName] = useState('');

	const [canAddNewItem, setCanAddNewItem] = useState(false);
	
	const [newShopName, setNewShopName] = useState('');
	const [newMainImage, setNewMainImage] = useState(null);
	const [newItemCataId, setNewItemCataId] = useState('');
	const [newItemOpenTime, setNewItemOpenTime] = useState('');
	const [newItemCloseTime, setNewItemCloseTime] = useState('');
	const [newItemPriceType, setNewItemPriceType] = useState('');
	
	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.post(url+'account/',{'username':localStorage.getItem('user223')})
		.then(res=>{
			setData(res.data.profile);
			setAccScreen(true);
			
		})
	},[]);

	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.get(url+'ShopCatagories/')
		.then(res=>{
			setShopCatagories(res.data.data);
		})
	},[]);


	const updateFirstname=()=>{
		const url = localStorage.getItem('url');
		if (firstname==='') alert('Cannot asign empty value.');
		else{
			axios.post(url+'setFirstname/',{
					'username':localStorage.getItem('user223'),
					'firstname':firstname
				})
			.then(res=>{
				setData(res.data.profile);
				setFirstname('');
			})
		}
	}

	const updateLastname=()=>{
			if (lastname==='') alert('Cannot asign empty value.');
			else{
				const url = localStorage.getItem('url');
			axios.post(url+'setLastname/',{
					'username':localStorage.getItem('user223'),
					'lastname':lastname
				})
			.then(res=>{
				setData(res.data.profile);
				setLastname('');
			})
		}
	}
	
	const updateEmail=()=>{
		if (email==='') alert('Cannot asign empty value.');
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'setEmail/',{
					'username':localStorage.getItem('user223'),
					'email':email
			})
		.then(res=>{
				setData(res.data.profile);
				setEmail('');
			})
		}
	}
	
	const updateShopName=(id)=>{
			if (shopName==='') alert('Cannot asign empty value.');
			else{
				const url = localStorage.getItem('url');
				axios.post(url+'setShopName/',{
					'id':id,
					'ShopName':shopName,
					'username':localStorage.getItem('user223')
				})
			.then(res=>{
				setData(res.data.profile);
				setShopName('');
			})
		}
	}

	const changeCatagory=(serviceId,catagoryId)=>{
		const url = localStorage.getItem('url');
		axios.post(url+'updateShopCatagory/',{
					'serviceId':serviceId,
					'catagoryId':catagoryId,
					'username':localStorage.getItem('user223')
				})
		.then(res=>{
				setData(res.data.profile);
				setChangeShopType(false);
		})
	}

	const changeMainImage=(id)=>{
		if (mainImage===null) alert('Imagen not selected.');
		else{
			const url = localStorage.getItem('url');
			var formData = new FormData();
			formData.append('id',id);
			formData.append('image',mainImage);
			formData.append('username',localStorage.getItem('user223'));

			axios.post(url+'updateMainImage/',formData)
			.then(res=>{
				setData(res.data.profile);
				setMainImage(null);
			})
			
		}
	}
	
	const changeImage=(id)=>{
		if (mainImage===null && profile===null) alert('Image not selected.');
		else{
			var formData = new FormData();
			formData.append('id',id);
			
			
			if(profile===null) formData.append('image',mainImage);
			else formData.append('image',profile);
			
			formData.append('username',localStorage.getItem('user223'));
			const url = localStorage.getItem('url');
			axios.post(url+'updateImage/',formData)
			.then(res=>{
				setData(res.data.profile);
				setMainImage(null);
				setProfile(null);
			})
			
		}
	}



	const addNewImg=(id)=>{
	    if (mainImage===null) alert('Imagen not selected.');
	    else{                             
	        var formData = new FormData();                                        
	        formData.append('id',id);                        
	        formData.append('image',mainImage);         
	        formData.append('username',localStorage.getItem('user223'));
			const url = localStorage.getItem('url');
	        axios.post(url+'addNewImage/',formData)
	        .then(res=>{
	            setData(res.data.profile);
	            setMainImage(null);
	        })
	
	    }
	 }

	 const changeOpenTime=(id)=>{
	 	if (openTime==='') alert('Cannot asign empty value.');
	 	else{
	 		const url = localStorage.getItem('url');
	 		axios.post(url+'setOpenTime/',{
	 				'username':localStorage.getItem('user223'),
	 				'id':id,
	 				'openTime':openTime
	 			})
	 		.then(res=>{
	 			setData(res.data.profile);
	 			setOpenTime('');
	 		})
	 	}
	 }

	const changeCloseTime=(id)=>{
	 	if (closeTime==='') alert('Cannot asign empty value.');
	 	else{
	 		const url = localStorage.getItem('url');
	 		axios.post(url+'setCloseTime/',{
	 				'username':localStorage.getItem('user223'),
	 				'id':id,
	 				'closeTime':closeTime
	 			})
	 		.then(res=>{
	 			setData(res.data.profile);
	 			setCloseTime('');
	 		})
	 	}
	 }
	
	const changePriceType=(id)=>{
	 	if (priceType==='') alert('Cannot asign empty value.');
	 	else{
	 		const url = localStorage.getItem('url');
	 		axios.post(url+'setPriceType/',{
	 				'username':localStorage.getItem('user223'),
	 				'id':id,
	 				'priceType':priceType
	 			})
	 		.then(res=>{
	 			setData(res.data.profile);
	 			setPriceType('');
	 		})
	 	}
	 }
	
	const deleteSearchName=(id)=>{
		const url = localStorage.getItem('url');
	 	axios.post(url+'deleteSearchName/',{
 			'username':localStorage.getItem('user223'),
			'id':id
	 	})
	 	.then(res=>{
	 		setData(res.data.profile);
	 	})
	 }
	 
	const deleteImage=(id)=>{
		const url = localStorage.getItem('url');
	 	axios.post(url+'deleteImage/',{
 			'username':localStorage.getItem('user223'),
			'id':id
	 	})
	 	.then(res=>{
	 		setData(res.data.profile);
	 	})
	 }
	 
	const addSearchName=(serviceId)=>{
	 	if (searchName==='') alert('Cannot asign empty value.');
	 	else{
	 		const url = localStorage.getItem('url');
	 		axios.post(url+'addSearchName/',{
	 				'username':localStorage.getItem('user223'),
	 				'serviceId':serviceId,
	 				'searchName':searchName
	 			})
	 		.then(res=>{
	 			setData(res.data.profile);
	 			setSearchName('');
	 		})
	 	}
	 }


	 const updateDesc=(serviceId)=>{
	 	if(desc===''){
	 		alert('Description box should not be empty.')
	 	}else{
	 		const url = localStorage.getItem('url');
	 		axios.post(url+'updateDesc/',{
	 							'username':localStorage.getItem('user223'),
	 			 				'serviceId':serviceId,
	 			 				'desc':desc
	 			})
	 		.then(res=>{
	 			setData(res.data.profile);
	 			setDesc('');
	 			})
	 	}
	 }

	 const addNewService=()=>{
	 	if(newShopName==='' || newMainImage===null || newItemOpenTime==='' || newItemCloseTime==='' || newItemPriceType==='' || newItemCataId===''){
	 		alert('All fields are required.');
	 	}
	 	else{
	 		var formData = new FormData();
	 		formData.append('ShopName',newShopName);
	 		formData.append('MainImage',newMainImage);
	 		formData.append('catagoryId',newItemCataId);
	 		formData.append('OpenTime',newItemOpenTime);
	 		formData.append('CloseTime',newItemCloseTime);
	 		formData.append('PriceType',newItemPriceType);
	 		formData.append('username', localStorage.getItem('user223'));
			const url = localStorage.getItem('url');
	 		axios.post(url+'addNewService/',formData)
	 		.then(res=>{
	 			 setData(res.data.profile);
	 			 setNewShopName('');
	 			 setNewMainImage(null);
	 			 setNewItemCataId('');
	 			 setNewItemOpenTime('');
	 			 setNewItemCloseTime('');
	 			 setNewItemPriceType('');
	 			 setCanAddNewItem(false);
	 		})
	 	}
	 }
	
	
	return(
		<div className='AccountScreen'>
			{accScreen?<div>
				<h1 className='m-20'>Account</h1>
				
				<img className='profileImg' 
				src={profile?URL.createObjectURL(profile):data.Image.Image} alt='Profile'/><br/>
				<input type='file'
				onChange={(e)=>setProfile(e.target.files[0])}
				accept='image/*'/>
				{profile?<button onClick={()=>{changeImage(data.Image.id)}}>Set</button>:<p>Choose image to update.</p>}
				<h4 className='m-20 f-cursive'>@{data.User.username}</h4>

				{settingFirstname?<h3>First Name : <input type='text' 
					onChange={e=>{setFirstname(e.target.value)}}/><button
									onClick={()=>{updateFirstname(); setSettingFirstname(false);}}
								>Set</button>
				</h3>:<h3>
					First Name : {data.User.first_name}<button
					onClick={()=>{setSettingFirstname(true)}}
				>Update</button></h3>}


				{settingLastname?<h3>Last Name : <input type='text' 
					onChange={e=>{setLastname(e.target.value)}}/><button
						onClick={()=>{updateLastname(); setSettingLastname(false);}}
				>Set</button>
				</h3>:<h3>
				Last Name : {data.User.last_name}<button
					onClick={()=>{setSettingLastname(true)}}
				>Update</button></h3>}
				

				{settingEmail?<h3>Email : <input type='text' 
					onChange={e=>{setEmail(e.target.value)}}/><button
						onClick={()=>{updateEmail(); setSettingEmail(false);}}
				>Set</button>
				</h3>:<h3>
				Email : {data.User.email}<button
					onClick={()=>{setSettingEmail(true)}}
				>Update</button></h3>}


				
				{data.Service?<div>
					<h1 className='m-20'>Services provided by you</h1>
					{data.Service.map(d=>{return(
						<div key={d.id} className='editServiceCard'>
							{d.VStatus && <p className='VStatus'>verified</p>}
							<p>Rating : {d.Rating}</p>

							{settingShopName?<h4><input type='text' 
							onChange={e=>setShopName(e.target.value)}/><button 
							onClick={()=>{updateShopName(d.id); setSettingShopName(false);}}
							>Set</button></h4>:<h4>{d.ShopName}<button 
							onClick={()=>{setSettingShopName(true)}}>Update</button></h4>}

							<p>Category : {d.Type.Name}<button 
							onClick={()=>{setChangeShopType(true)}}>Change</button></p>
							<p>more : {d.Type.Description}</p>

							{changeShopType?<div>
								{shopCatagories.map(Sc=>{return(
									<div key={Sc.id} className='ShopType' 
									onClick={()=>changeCatagory(d.id,Sc.id)}>
										<h5>{Sc.Name}</h5>
										<p>{Sc.Description}</p>
									</div>
								)})}
							</div>:''}
							
							<div className='breakpoint'></div>
							<h3>Service Images</h3>

							<input type='file'
							onChange={(e)=>setMainImage(e.target.files[0])}
							accept='image/*'/>
							
							{mainImage?<div className='previewImage'>
								<img src={URL.createObjectURL(mainImage)} alt='product'/>
								<p>preview</p>
								<em>Now click the replace/add 
								button to replce with/add this image.</em>
								<button onClick={()=>{addNewImg(d.id)}}>Add</button>
							</div>:<p>Select image to add new or replace any.</p>}

							
							<div className='imageSlider'>
								
								<span>
									<img src={d.MainImage} alt='product'/>
									<button
										onClick={()=>changeMainImage(d.id)}
									>Replce</button>
								</span>
								
								{d.ServiceImages.map(i=><span key={i.id}>
									<img src={i.Image} alt=''/>
									<button
										onClick={()=>changeImage(i.id)}>
										Replce
									</button>
									<button
										onClick={()=>deleteImage(i.id)}>
										Delete
									</button>
								</span>)}
							</div>



							{settingDesc?<div className='descBox'>
								<h3>Set Description</h3>
								<textarea 
								rows='20' cols='60'
								value={desc} onChange={e=>setDesc(e.target.value)}></textarea><br/>
								<button onClick={()=>{updateDesc(d.id);
												setSettingDesc(false)}}>Set</button>
								</div>:<div className='descBox'>
								<h3>Description</h3>
								<p>{d.Description}</p>
								<button onClick={()=>{setSettingDesc(true)}}>update</button>
								</div>}
							
							{settingOpenTime?<div>
								<input type='text'
								onChange={e=>setOpenTime(e.target.value)}
								/><button onClick={()=>{changeOpenTime(d.id); 
												setSettingOpenTime(false);}}>Set</button>
							</div>:<p>Open Time to contact : {d.OpenTime}<button
							onClick={()=>setSettingOpenTime(true)}
							>Update</button></p>}

							
							{settingCloseTime?<div>
								<input type='text'
								onChange={e=>setCloseTime(e.target.value)}
								/><button onClick={()=>{changeCloseTime(d.id); 
												setSettingCloseTime(false);}}>Set</button>
							</div>:<p>Close Time to contact : {d.closeTime}<button
							onClick={()=>setSettingCloseTime(true)}
							>Update</button></p>}
							
							{settingPriceType?<div>
								<input type='text' placeholder='eg. Rs.10/month'
								onChange={e=>setPriceType(e.target.value)}
								/><button onClick={()=>{changePriceType(d.id); 
												setSettingPriceType(false);}}>Set</button>
							</div>:<p>Rent : {d.PriceType}<button
							onClick={()=>setSettingPriceType(true)}
							>Update</button></p>}
							
							<div className='breakpoint'></div>
							<h4>Search Tags</h4>
							
							{d.SearchNames.map(sn=><p key={sn.id}>{sn.Name}
							<button className='cross cross-for-delete'
							onClick={()=>{deleteSearchName(sn.id)}}
							>X</button>
							</p>)}

							<div>
								<input value={searchName} 
								placeholder='Name/product/area/nick name/etc.'
								onChange={e=>setSearchName(e.target.value)}/>
								<button onClick={()=>addSearchName(d.id)}>Add new</button>
							</div>

							
							<div className='breakpoint'></div>
							<h4>Feedbacks</h4>
							
							{d.ServiceFeedback.map(f=>{return(
								<div key={f.id} className='feed'>
									<p>{f.Username}</p>
									<p>{f.Message}</p>
									<p>{f.Date}</p>
								</div>
							)})}

							<h4>Rated by</h4>
							{d.RatedBy.map(u=><p key={u.id}>{u.username}</p>)}
						</div>
					)})}
					
					{canAddNewItem?<div className='addServiceCard'>
						<p>Product/Service Name : <textarea rows='2' cols='60'
						placeholder='Enter full name with address(if want to sell)'
						onChange={e=>setNewShopName(e.target.value)}></textarea></p>

						<p className='previewImage'>
							{newMainImage?<img src={URL.createObjectURL(newMainImage)} alt=''/>:''}
						</p>
						
						<p>Main Image : <input type='file' accept='image/*' 
						onChange={e=>setNewMainImage(e.target.files[0])}/></p>
						<p><em>Note : You can add more images later.</em></p>

						<p>Catagory : select from below list.</p>
						
						<div>
						{shopCatagories.map(Sc=>{return(
								<div key={Sc.id} className='ShopType' 
								onClick={()=>setNewItemCataId(Sc.id)}>
								<h5>{Sc.Name}</h5>
								<p>{Sc.Description}</p>
								{newItemCataId===Sc.id && <p><em>selected</em></p>}
							</div>
							)})}
						</div>
						
						<p>Description is most important and describing way.<br/>
							 Please add after save with relax mind.</p>
						
						<p>Open Time to contact : <input type='text' 
						placeholder='eg. 10:00 am'
						onChange={e=>setNewItemOpenTime(e.target.value)}/></p>
						
						<p>Close Time to contact : <input type='text' 
						placeholder='eg. 9:00 pm'
						onChange={e=>setNewItemCloseTime(e.target.value)}/></p>
						
						<p>Rent : <input type='text' 
						placeholder='eg. Rs.10/month'
						onChange={e=>setNewItemPriceType(e.target.value)}/></p>
						
						<p>Note: Add search tag(after saving) so CONSUMERS can find you more easily.</p>
						<p></p>
						<p>MOST IMP : Do not forget to add your name, your 
						Product  name(all types of name), your area(including city, colony, etc) 
						in many different way to search tag.</p>
						<p></p>

						<button onClick={addNewService}>Add</button>
						
					</div>:<button onClick={()=>setCanAddNewItem(true)}>Add new service</button>}
					
				</div>:''}
					
			</div>:<div><h6><i>loading...</i></h6></div>}
			
		</div>
	);
}

export default AccountScreen;