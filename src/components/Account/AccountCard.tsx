import React from 'react'
import { IUser } from '@/@types'
import Image from 'next/image'

export default function AccountCard({account_data}: {account_data: IUser}) {
  return (
    <div className="bg-white p-10 flex flex-col mt-15 w-full rounded-2xl shadow-xl">
              <Image
                src={
                  account_data.profile_picture
                    ? account_data.profile_picture
                    : "/profile.jpg"
                }
                width={100}
                height={100}
                alt="profile"
                className="w-30 h-30 flex rounded-full bg-white"
              />
              <p className="text-4xl font-bold mt-5">
                {account_data?.first_name} {account_data?.last_name}
              </p>
              <p className="italics mt-3">@{account_data?.username}</p>
              <p className="italics text-sm text-gray-500">
                Member since{" "}
                {new Date(account_data?.date_joined).toDateString().substring(4)}
              </p>
              <p className="italics text-sm text-gray-500">
                {account_data?.verified && (
                    <p>Verified UGA Student</p>
                )}
              </p>
              <div className="grid grid-cols-2 mt-5 w-1/2">
                <div className="flex flex-col">
                  <p>2</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p>1</p>
                  <p>Following</p>
                </div>
              </div>
              <p>{account_data?.email}</p>
              <p>{account_data?.discord}</p>
              <p>{account_data?.groupme}</p>
              <p>{account_data?.instagram}</p>
              <p>{account_data?.snapchat}</p>
              <p></p>
            </div>
  )
}
