import React,{ useState, useEffect} from 'react';
import axios from 'axios';

function Description(props){

	const [data, setData] = useState(false);
	const [profile, setProfile] = useState(false);

	const [canRate, setCanRate] = useState(false);
	
	const [rating, setRating] = useState(25);

	const [feed, addFeed] = useState('')

	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.post(url+'productData/',{
					'productId':props.productId,
					'Username': localStorage.getItem('user223')
			}).then(res=>{
			setData(res.data.data);
			setProfile(res.data.providerDetail);
		})
	},[]);


	const addNewSmsBox=(provider)=>{
		const user = localStorage.getItem('user223');
		if(user===provider) alert('You cannot send message to yourself.');
		else if(user===null) alert('Please login or signup.')
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'addNewSmsBox/',{
				'user':user,
				'provider':provider
			}).then(res=>{
				if (res.data.msg){
					props.afterAddingNewSms(user,provider);
				}
			})
		}
	}

	const giveRating=()=>{
		const user = localStorage.getItem('user223')
		if(user===null) alert('Please signup or login.');
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'giveRating/',{
					'user':user,
					'productId':props.productId,
					'rating':rating
			}).then(res=>{
			if(res.data.msg){
				alert(res.data.msg);
			}else{
				setData(res.data.data);
				setProfile(res.data.providerDetail);
			}
			setCanRate(false);
			})
		}
	}


	const giveFeed=()=>{
		const user = localStorage.getItem('user223')
		if (feed==='') alert('Feedback should not be empty.');
		else if(user===null) alert('Please signup or login.');
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'addServiceFeed/',{
							'user':user,
							'productId':props.productId,
							'feed':feed
			}).then(res=>{
				setData(res.data.data);
				setProfile(res.data.providerDetail);
				addFeed('');
			})
		}
	}
	return(
		<div className='Description'>
			<h1>Details</h1>
			{data?<div>
				<h3>Rating : {data.Rating}</h3>


				{canRate?<div>
					<input type='range' min='0' max='50' value={rating}  
						onChange={e=>setRating(e.target.value)}/><br/>
					<button onClick={giveRating}>Rate</button>
				</div>:<button onClick={setCanRate(true)}>Give rating</button>}


				<h2>{data.ShopName}</h2>
				<h6>Shop Type : {data.Type.Name}</h6>
				<p>{data.Type.Description}</p>
				
				<div className='imageSlider'>
					<span>
						<img src={data.MainImage} alt='product'/>
					</span>
					{data.ServiceImages.map(i=><span key={i.id}>
						<img src={i.Image} alt=''/>
					</span>
					)}
				</div>

				<p>Open Time : {data.OpenTime}</p>
				<p>Close Time : {data.closeTime}</p>
				<p>Price Type : {data.PriceType}</p>

				<div className='descBox'>
					<h3>Description</h3>
					<p>{data.Description}</p>
				</div>

				{profile?<div className='providerDetail'>
					<h1>Provider details</h1>
					<h3>Username : @{profile.User.username}</h3>
					<h3>Address : {profile.Address}</h3>
					<a href={'tel:'+profile.MobileNo}><button>Call</button></a>
					<a href={'sms:'+profile.MobileNo}><button>Direct message</button></a>
					<button onClick={()=>addNewSmsBox(profile.User.username)}>Message</button>
				</div>:''}


				<div className='breakpoint'></div>
					<h1>Feedbacks</h1>
											
					{data.ServiceFeedback.map(f=>{return(
					<div key={f.id} className='feed'>
						<p>{f.Username}</p>
						<p>{f.Message}</p>
						<p><em>{f.Date}</em></p>
					</div>
				)})}

				<div>
					<textarea 
					value={feed}
					placeholder='how service provider can  improve.'
					onChange={(e)=>addFeed(e.target.value)}
					></textarea><br/>
					<button
					onClick={giveFeed}
					>give feedback</button>
				</div>
			</div>:<div><h6><i>loading...</i></h6></div>}
		</div>
	)
}

export default Description;