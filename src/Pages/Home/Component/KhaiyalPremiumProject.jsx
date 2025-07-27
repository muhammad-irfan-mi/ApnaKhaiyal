import orionGroups from '../../../assets/images/recentadds/orionGroup.jpeg'
import allNoor from '../../../assets/images/recentadds/alNoor.jpeg'
import khaiyalLogos from '../../../assets/images/recentadds/KhaiyalLogos.png'
import allAhmad from '../../../assets/images/recentadds/alAhmad.jpeg'


const KhaiyalPremiumProject = () => {
    const products = [
        { id: 0, img: khaiyalLogos, text: "Khaiyal Group" },
        { id: 1, img: allNoor, text: "Al-Noor Garden Lodhran" },
        { id: 2, img: orionGroups, text: "Orion Town" },
        { id: 3, img: allAhmad, text: "Al Ahmed Builders" },
    ];


    return (
        <div className='px-5 py-6 w-[90%] mx-auto relative top-60 bg-[#FFFFFF]'>
            <h1 className='text-3xl font-bold mb-6 text-slate-700'>Khaiyal Premium Projects</h1>

            <div className='flex flex-wrap gap-4 justify-between'>
                {products.map((product) => (
                    <div key={product.id} className='w-[20%] flex flex-col justify-center items-center'>
                        <img src={product.img} alt={product.text} className=' object-cover rounded-md' />
                        <a className='flex justify-center items-center hover:text-blue-500 transition transform scale-110 mt-2 font-semibold'>{product.text}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default KhaiyalPremiumProject;