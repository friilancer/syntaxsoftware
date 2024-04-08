'use client'

import Nav from "@/components/nav";

import {
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftAddon,
  InputLeftElement,
  Button,
} from '@chakra-ui/react'
import Link from "next/link";
import {
  FaSearch
} from 'react-icons/fa'
import ReviewsCard from "@/components/cards/reviews";
import { useLayoutEffect, useEffect, useRef } from "react";

export default function Home() {

  const containerRef = useRef()

  useLayoutEffect(() => {
    let elem  = containerRef?.current as any
    if(elem){
      elem.scrollTop = 100
    }
  }, [containerRef?.current])

  return (
    <Box className="max-w-screen-xl mx-auto flex min-h-[100vh] p-3 px-5 flex-col">
      <Nav>
        <Box className="flex w-full justify-end">
          <Link className="text-[#557FF2] font-bold" href={"reviews"}>
            LOGIN
          </Link>
        </Box>
      </Nav>
      <main >
        <Box className="flex min-h-[90vh] items-center h-full w-full justify-between">
          <Box className="flex flex-col gap-5 lg:max-w-[50%]">
            <Text className="text-5xl xl:text-6xl font-bold max-w-md">
              Find a place you will love to live!
            </Text>
            <Text className="max-w-md my-3">
              See through the lenses of people who have lived or visited the neighbourhood you might have in mind.
            </Text>
            <InputGroup className="border rounded flex w-full max-w-lg p-2">
              <InputLeftAddon className="pr-4" >
                <FaSearch color="#0D2159" />
              </InputLeftAddon>
              <Input
                placeholder='Enter Address'
                type={"text"}
                className="w-full "
                outline={"none"}
              />
            </InputGroup>
            <Link href={"reviews"} className=" w-full max-w-[200px]">
              <Button size={"lg"} _hover={{ backgroundColor: '#3377FF' }} bgColor={"#3366FF"} color="white" className="min-w-[200px] bg-[#3366FF] text-white capitalize py-6">
                SEARCH
              </Button>
            </Link>
          </Box>
          
          <Box className="lg:flex relative max-h-[90vh] overflow-hidden bg-gray-100 gap-5 hidden">
            {/* @ts-ignore */}
            <Box ref={containerRef} className="lg:flex  max-h-[90vh] overflow-hidden bg-gray-100 gap-5 hidden" >
              <Box className="flex flex-col gap-5" >
                <ReviewsCard />
                <ReviewsCard />
                <ReviewsCard />
                <ReviewsCard />
                <ReviewsCard />
              </Box>
              <Box className="flex flex-col gap-5">
              <ReviewsCard />
                <ReviewsCard />
                <ReviewsCard />
                <ReviewsCard />
                <ReviewsCard />
              </Box>
            </Box>
            <Box className="absolute gradient bottom-0 left-0 h-[100%] w-[100%]"></Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
}
