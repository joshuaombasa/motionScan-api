const mongoose = require('mongoose')

const otherScanners = [{ name: "Tranquil Healing Hospital", status: "failed", price: 12000, imageUrl: "https://t3.ftcdn.net/jpg/01/27/96/46/240_F_127964695_WxIo3nLZmbwMLCd8jWQdr7fl1KfH1L6N.jpg", description: "The Philips Ingenuity CT series is known for its advanced imaging capabilities and user-friendly design. It offers fast and accurate imaging with reduced artifacts, providing detailed and reliable diagnostic information. With features such as metal artifact reduction and spectral imaging, it is suitable for various complex imaging procedures, including trauma assessment and oncology staging." }, { name: "Apex Care Hospital", status: "working", price: 12000, imageUrl: "https://t3.ftcdn.net/jpg/04/80/04/40/240_F_480044003_XwymDZqa01ryagEc69TcX62TphsXAQLO.jpg", description: "The GE Optima CT660 is recognized for its high image quality, exceptional speed, and patient-centric design. It is equipped with advanced dose reduction technologies, enabling accurate imaging with minimal radiation exposure. The system's versatility makes it well-suited for a wide range of clinical applications, including cardiovascular, oncology, and pediatric imaging." },]

const hospitals = [{ name: "Oasis General Hospital", status: "working", price: 12000, imageUrl: "https://media.istockphoto.com/id/185295386/photo/high-definition-ct-scanner.jpg?s=612x612&w=0&k=20&c=itud8_XDQiN5agVo7NFkNcLgId4_NvdUdQ4Hg86bGRA=", description: "Siemens SOMATOM Definition AS+ is known for its high-resolution imaging capabilities and advanced technological features. It offers fast scanning times, reduced radiation doses, and improved image quality, making it suitable for various clinical applications, including cardiovascular and neurological imaging." }, { name: "Mapleview Medical Center", status: "failed", price: 6000, imageUrl: "https://t3.ftcdn.net/jpg/03/15/06/62/240_F_315066249_2DATI5JMJjxJConHTEiPDstCmiLj34kv.jpg", description: "The Revolution CT is recognized for its exceptional image quality, wide coverage, and rapid imaging capabilities. It integrates cutting-edge technology to deliver high-resolution images with reduced radiation exposure, making it suitable for a wide range of diagnostic imaging needs, including cardiac and whole-body imaging." }, { name: "Meadowbrook General Hospital", status: "working", price: 10000, imageUrl: "https://t4.ftcdn.net/jpg/04/39/39/79/240_F_439397949_aRMOMdTOBhGLu1hlaDgsUAmubh32xhEO.jpg", description: "The Philips Brilliance iCT series is known for its excellent image quality, fast scanning speeds, and versatile clinical applications. It offers advanced features such as adaptive image filters and dose management tools, ensuring efficient and precise imaging for a variety of applications, including trauma and oncology imaging." }, { name: "Horizon View Health Center", status: "failed", price: 8000, imageUrl: "https://t4.ftcdn.net/jpg/02/48/72/97/240_F_248729735_SpBmlJFcUM11CYyHRO5eR1TaeVIOEPOX.jpg", description: "The Hitachi Scenaria series is notable for its advanced imaging technologies, patient-friendly design, and streamlined workflow. It offers high-quality imaging with reduced radiation exposure and features intuitive software for efficient data analysis, making it suitable for a broad range of clinical applications, such as orthopedic and abdominal imaging." }, ...otherScanners]

mongoose.set('strictQuery', false)

const scannerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
})

scannerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Scanner = mongoose.model('Scanner', scannerSchema)

const saveData = async () => {
    for (let i = 0; i < hospitals.length; i++) {
        const hospitalObject = new Scanner(hospitals[i])
        await hospitalObject.save()
    }
}

saveData()