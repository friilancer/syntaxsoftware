'use client'
import { doc, setDoc, Timestamp } from "firebase/firestore"; 
import { 
    Box, 
    Text,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    InputLeftAddon,
    InputRightAddon,
    Avatar,
 } from "@chakra-ui/react"
import Image from "next/image"
import { FaThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegThumbsUp, FaRegCommentAlt, FaCommentAlt, FaStar } from "react-icons/fa"
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat' // load on demand
import relativeTime from 'dayjs/plugin/relativeTime'
import { MouseEventHandler } from "react";

dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

interface Reviews {
    variant?: 'read-only' | 'active';
    applyShadow?: boolean;
    showLocation?: boolean;
    showTag?: boolean;
    containerClasses?: string;
    ratingsStyle?: 'sm' | 'lg';
    name?: string;
    avatarUrl?: string;
    rating?: number;
    message?: string;
    created_at?: string;
    tag?: string;
    tagColor?: string;
    onClick?: MouseEventHandler
}

const ReviewsCard = ({
    variant = 'read-only',
    applyShadow = true,
    showLocation = true,
    showTag = true,
    containerClasses = '',
    ratingsStyle = 'lg',
    name = 'James T.',
    avatarUrl = '/avatar.png',
    rating = 4,
    message = 'There is no stable electricity. The roads are fairly good and there is a sense of community. The drainage system is poor and most residents litter their surroundings. There are several grocery stores and Supermarkets.',
    created_at = dayjs().subtract(3, 'months').fromNow(),
    tag='traffic',
    tagColor='yellow',
    onClick=() => {}
}: Reviews) => {
    return (
        <Box onClick={onClick} className={`w-full ${ applyShadow ? 'shadow-xl' : '' }  bg-white p-5 rounded-lg ${containerClasses || 'max-w-xs'}`}>
            <Box className="flex justify-between  item-center w-full">
                <Box className="flex items-center gap-2">
                    <Avatar size={"sm"} name={name} src={avatarUrl} />
                    <Box className={`${ratingsStyle === "lg" ? 'flex-col gap-1' : 'flex-row gap-2 items-center'} flex`}>
                        <Text className="text-sm m-0 p-0 leading-3 capitalize font-semibold">
                            {name}
                        </Text>
                        <Text className={`${ratingsStyle === "lg" ? 'text-xs' : 'text-sm'} m-0 text-gray-500 font-normal leading-3 p-0`}>
                            {created_at}
                        </Text>
                    </Box>
                </Box>
                <Box className="flex flex-col justify-center gap-1">
                    {
                        showLocation ? (
                            <Text className="text-sm m-0 p-0 leading-3 font-semibold">
                                Ikate, Lekki
                            </Text>
                        ) : null
                    }
                    {
                        ratingsStyle == 'lg' ? (
                            <Box className="flex m-0 p-0 items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((val, index) => {
                                     return (
                                        <FaStar 
                                            key={index}
                                            className={` cursor-pointer ${rating >= val ? 'text-yellow-500' : 'text-gray-300'}`}
                                        />
                                    )
                                })}
                            </Box>
                        ) : (
                            <Box className="flex m-0 p-0 items-center gap-0.5">
                                <FaStar className="text-xs text-yellow-500"/>
                                <Text className="text-xs">{rating.toFixed(1)}</Text>
                            </Box>
                        )
                    }
                 </Box>
            </Box>

            <Box className="my-3">
                <Text className="text-sm">
                    {message}
                </Text>
            </Box>

            <Box className={`flex justify-between items-center ${ratingsStyle == "sm" ? 'border-b pb-4 border-[#D9D9D9]' : ''}`}>
                <Box className="flex items-center gap-3">
                    <Box className="flex gap-1 items-center">
                        {
                            ratingsStyle === "lg" ? <FaThumbsUp className="text-sm text-gray-400"/> : <FaRegThumbsUp className="text-sm text-[#0D2159]"/>
                        }
                        <Text className={`${ratingsStyle === "lg" ? 'text-gray-500' : 'text-[#0D2159]'} text-sm`}>24</Text>
                    </Box>  
                    <Box className="flex gap-1 items-center">
                        {
                            ratingsStyle === "lg" ? <FaThumbsDown className="text-sm text-gray-400"/> : <FaRegThumbsDown className="text-sm text-[#0D2159]"/>
                        }
                        <Text className={`${ratingsStyle === "lg" ? 'text-gray-500' : 'text-[#0D2159]'} text-sm`}>02</Text>
                    </Box>
                    <Box className="flex gap-1 items-center">
                        {
                            ratingsStyle === "lg" ? <FaCommentAlt className="text-sm text-gray-400"/> : <FaRegCommentAlt className="text-sm text-[#0D2159]"/>
                        }
                        <Text className={`${ratingsStyle === "lg" ? 'text-gray-500' : 'text-[#0D2159]'} text-sm`}>125</Text>
                    </Box>
                </Box>
                {
                    showTag ? (
                        <Box className={`w-min text-yellow-800 text-xs border border-1.5 border-yellow-600 bg-yellow-100 px-2 rounded-full`}>
                            {tag}
                        </Box>
                    ) : null
                }
            </Box>

            {
                variant === "active" ? (
                    <Box className="border-b border-[#D9D9D9] mt-3 pb-3">
                        <InputGroup className="rounded w-full">
                            <Input
                                placeholder='Add a comment'
                                type={"text"}
                                className="w-full"
                                outline={"none"}
                            />
                            <InputRightAddon>
                                <Button _hover={{ backgroundColor: '#3377FF' }} size={"sm"} bgColor={"#3366FF"} color="white" className="bg-[#3366FF] text-white capitalize">
                                    POST
                                </Button>
                            </InputRightAddon>
                        </InputGroup>
                    </Box>
                ) : null
            }
        </Box>
    )
}

export default ReviewsCard