'use client'
import { 
    Box,
    Text,
    InputGroup,
    Input,
    InputRightElement,
    InputLeftAddon,
    InputRightAddon,
    InputLeftElement,
    Button,
    Divider,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
    Checkbox, CheckboxGroup,
    Select,
    useToast,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import Nav from '@/components/nav'
import { FaSearch, FaRegBookmark, FaShareAlt , FaStar} from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import { GoShareAndroid } from "react-icons/go"
import ReviewsCard from '@/components/cards/reviews';
import Image from "next/image";
import axios from 'axios'
import { useEffect, useState } from 'react';
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat' // load on demand
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)


export default function Reviews ({
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [rating, setRating] =  useState(0)
    const [amenities, setAmenities] = useState('')
    const [review, setReview] = useState('')
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [userId, setUserId] = useState('')
    const toast = useToast()
    const [activeReview, setActiveReview] = useState(0)

    const [allReviews, setAllReviews] = useState([])

    const categories = [
        "Schools",
        "Hospitals",
        "Resort Park",
        "Shopping Malls",
        "Airport",
        "Train Station",
        "Nightlife",
        "Public Wifi",
        "Parking Lot",
        "Security",
        "Public Transport",
        "Bus Station",
        "Quiet"
    ];

    const getAnonymousUser = () => {
        let id = localStorage.getItem('anonymous_user')

        if(!id){
            const _id = v4()
            localStorage.setItem('anonymous_user', _id)
            setUserId(_id)
        }else {
            setUserId(id)
        }
    }

    const getAllReviews = async () => {
        try {
            const response = await axios.get('/api/get-all-reviews')
            setAllReviews(response.data?.data?.reviews)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAnonymousUser()
    }, [])

    useEffect(() => {
        getAllReviews()
    }, [])

    const submitReview = async () => {
        try {
            if(!amenities){
                return toast({
                    title: 'Submission failed',
                    description: "Please select an amenity",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            if(rating < 1){
                return toast({
                    title: 'Submission failed',
                    description: "Please choose a rating",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            
            if(!review || review.trim().length < 1){
                return toast({
                    title: 'Submission failed',
                    description: "Please write a review",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            if(!isAnonymous){
                return toast({
                    title: 'Submission failed',
                    description: "Please check the anonymous option as you are not signed in",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            const response = await axios.post('/api/review', {
                amenity: amenities.trim().toLowerCase(),
                anonymousUserId: userId,
                isAnonymous,
                message : review.trim(),
                rating
            })
            if(response.data?.data?.review){
                let review = response.data?.data?.review
                //@ts-ignore
                setAllReviews(prev => [...prev, review])
                toast({
                    title: 'Review submitted',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
                onClose()
            }
        } catch (e) {
            console.log("Error submitting====", e)
        }
    }

    return (
        <Box className=" max-w-[100vw] flex xl:max-h-[100vh] xl:overflow-hidden flex-col">
            <Box className='bg-blue-50'>
                <Box className="max-w-screen-xl mx-auto w-[100vw] flex xl:max-h-[100vh] xl:overflow-hidden p-3 px-5 flex-col">
                    <Nav>
                        <Box className="flex pl-10 w-full gap-8 justify-end sm:justify-between">
                            <Box className='hidden sm:flex w-[50vw] sm:w-full sm:min-w-max'>
                                <InputGroup className="border rounded w-full max-w-sm lg:max-w-lg xl:max-w-lg p-2">
                                    <InputLeftAddon className="pr-4" >
                                        <FaSearch color="#3366FF" />
                                    </InputLeftAddon>
                                    <Input
                                        placeholder='Enter Address'
                                        type={"text"}
                                        className="w-full bg-blue-50"
                                        outline={"none"}
                                        value={`Bonny and Clyde Street, Ajao Estate, Lagos`}
                                    />
                                    <InputRightAddon bgColor={"transparent"}>
                                        <IoClose />
                                    </InputRightAddon>
                                </InputGroup>
                            </Box>
                            <Box className="flex items-center gap-2 w-[140px]">
                                <Text className="text-md font-semibold">
                                    Welcome!
                                </Text>
                                <Image
                                    src="/avatar.png"
                                    alt="user"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                            </Box>
                        </Box>
                    </Nav>

                    <Box className='flex sm:hidden w-full'>
                                <InputGroup className="border rounded w-full p-2">
                                    <InputLeftAddon className="pr-4" >
                                        <FaSearch color="#3366FF" />
                                    </InputLeftAddon>
                                    <Input
                                        placeholder='Enter Address'
                                        type={"text"}
                                        className="w-full bg-blue-50"
                                        outline={"none"}
                                        value={`Bonny and Clyde Street, Ajao Estate, Lagos`}
                                    />
                                    <InputRightAddon bgColor={"transparent"}>
                                        <IoClose />
                                    </InputRightAddon>
                                </InputGroup>
                    </Box>
                
                    <Box className='flex flex-wrap gap-5 items-center justify-between my-3'>
                        <Box>
                            <Text className={`font-semibold text-lg`}>
                                Bonny and Clyde Street, Ajao Estate, Lagos
                            </Text>
                            <Text>
                                <span className='font-semibold'>"{allReviews.length}" Reviews</span> (People are raving about the selected location)
                            </Text>
                        </Box>

                        <Box className='flex gap-4'>
                            <>
                                <Button _hover={{ backgroundColor: '#3377FF' }} onClick={onOpen} bgColor={"#3366FF"} color="white" className=" bg-[#3366FF] text-white capitalize px-4 py-2">
                                    Leave a review
                                </Button>

                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay bgColor={'rgba(0,0,0,0.6)'} />
                                    <ModalContent >
                                        <Box className='flex flex-col h-[100vh] w-full items-center justify-center'>
                                            <Box bgColor={"white"} className={`flex flex-col gap-4 p-4 w-[90vw] max-w-[550px] rounded-lg`}>
                                                <Text className='text-center text-sm font-semibold'>Review Location</Text>
                                                <ModalBody className='flex flex-col gap-5' bgColor={"white"}>
                                                    <Text className='text-lg'>
                                                        Bonny and Clyde Street, Ajao Estate, Lagos
                                                    </Text>
                                                    <Select value={amenities} onChange={(e) => {setAmenities(e.target.value)}} variant={"filled"} placeholder={"Select Amenities"}>
                                                        {categories.map((category, index) => (
                                                            <option key={index} value={category}>{category}</option>
                                                        ))}
                                                    </Select>
                                                    <Box className='flex flex-col gap-1'>
                                                        <Text>Rate Location</Text>
                                                        <Box className="flex m-0 p-0 items-center gap-1">
                                                            {[1, 2, 3, 4, 5].map((val, index) => {
                                                                return (
                                                                    <FaStar 
                                                                        key={index}
                                                                        onClick={() => val === rating ? setRating(0) : setRating(val)} 
                                                                        className={`text-lg cursor-pointer ${rating >= val ? 'text-yellow-500' : 'text-gray-300'}`}
                                                                    />
                                                                )
                                                            })}
                                                        </Box>
                                                    </Box>
                                                    <Box className='flex flex-col gap-1'>
                                                        <Text>
                                                            Write Review
                                                        </Text>
                                                        <Textarea value={review} onChange={(e) => setReview(e.target.value)} rows={6} placeholder='Write a review' />
                                                    </Box>
                                                    <Checkbox isChecked={isAnonymous} onChange={() => {setIsAnonymous(prev => !prev)}}  className='text-sm' >Post as anonymous</Checkbox>
                                                    <Box className='w-full flex gap-3 flex-wrap sm:flex-nowrap justify-center items-center'>
                                                        <Button onClick={submitReview} _hover={{backgroundColor : "#3377FF"}} bgColor={"#3366FF"} color={"white"} className="w-full" >
                                                            SUBMIT
                                                        </Button>
                                                        <Button bgColor={"white"} borderColor="#3366FF" color="#3366FF" className="w-full" onClick={onClose} variant='outline'>CANCEL</Button>
                                                    </Box>
                                                </ModalBody>
                                                <ModalFooter></ModalFooter>
                                            </Box>
                                        </Box>
                                    </ModalContent>
                                </Modal>
                            </>
                            <Box className='border flex px-3 border-1.5 rounded justify-center flex-col border-[#3366FF]'>
                                <FaRegBookmark color='#3366FF' />
                            </Box>
                            <Box className='border flex px-3 border-1.5 rounded justify-center flex-col border-[#3366FF]'>
                                <GoShareAndroid color='#3366FF' />
                            </Box>
                        </Box>
                    </Box>
                    

                    <Box className='flex overflow-x-auto h-min hide-scroll gap-3 my-3'>
                        {categories.map((category) => (
                            <Box key={category} className="min-w-max rounded bg-white cursor-pointer border border-0.5 border-gray-800 hover:bg-gray-50 py-0.5 px-2 text-sm">
                                {category}
                            </Box>
                        ))}
                    </Box>

                </Box>
            </Box>

            <Box className="max-w-screen-xl mx-auto w-[100vw] flex xl:max-h-[100vh] xl:overflow-hidden p-3 px-5 flex-col">
                <Box className='flex w-full items-start flex-col-reverse overflow-hidden gap-6 xl:flex-row'>
                    <Box className='flex flex-col xl:max-h-[73vh] xl:min-w-[55%] xl:overflow-y-auto xl:hide-scroll pb-8 gap-4 w-full'>
                        {     
                            allReviews.map((_review : Record<string, any>, index) => {
                                return (
                                    <ReviewsCard 
                                        showLocation={false}
                                        showTag={false}
                                        applyShadow={false}
                                        ratingsStyle="sm"
                                        containerClasses='min-w-[100%] rounded-none max-w-max cursor-pointer'
                                        name={_review?.anonymousUserId == userId ? 'Me' : 'Anonymous'}
                                        tag={_review?.amenity}
                                        message={_review?.message}
                                        rating={_review?.rating}
                                        variant={activeReview === index ? 'active' : 'read-only'}
                                        created_at={dayjs(_review?.created_at?.seconds * 1000).fromNow()}
                                        onClick={() => {setActiveReview(index)}}
                                    />
                                )
                            })
                        }
                    </Box>
                    <Box className='flex flex-wrap items-center justify-center xl:justify-end gap-8 w-full'>
                        <Image
                            src="/dummy.png"
                            alt="user"
                            width={230}
                            height={230}
                            className="rounded"
                        />
                        <Image
                            src="/dummy.png"
                            alt="user"
                            width={230}
                            height={230}
                            className="rounded"
                        />
                        <Image
                            src="/dummy.png"
                            alt="user"
                            width={230}
                            height={230}
                            className="rounded"
                        />
                        <Image
                            src="/dummy.png"
                            alt="user"
                            width={230}
                            height={230}
                            className="rounded"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}