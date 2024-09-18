import { React, useState, useEffect } from "react";
import {Input} from "@nextui-org/input";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import {Checkbox} from "@nextui-org/checkbox";
import {LEAGUES, MLB_TEAMS, NBA_TEAMS, NHL_TEAMS} from "@/public/card_data";

export default function AddEditCard({card, onSave}) {
    return (
        <div className="flex flex-col gap-1">
            <Select label="Collection">
                {LEAGUES.map((league) => (
                    <SelectItem
                        key={league}>
                    </SelectItem>
                ))}
            </Select>
            <Select label="League">
                    {LEAGUES.map((league) => (
                        <SelectItem
                            key={league}>
                        </SelectItem>
                    ))}
            </Select>
            <Input label="Team" />
            <Input label="Player" />
            <Input label="Position" />
            <Checkbox>Rookie</Checkbox>
            <Checkbox>Relic</Checkbox>
            <Checkbox>Autograph</Checkbox>
            <Input label="Insert" />
            <Input label="Parallel" />
            <Input label="Brand" />
            <Input label="Set Name" />
            <Input label="Set Number" />
            <Input label="Rarity" />
            <Input label="Price" />
        </div>
    )
}