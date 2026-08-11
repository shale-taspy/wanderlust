"use client";

import { useState } from "react";
import { parseDate } from "@internationalized/date";
import {
    Button,
    TextArea,
    TextField,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    Modal,
    Surface,
    Calendar,
    DateField,
    DatePicker
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { FiEdit } from "react-icons/fi";

export function EditModal({ destination }) {
    const { destinationName, country, category, price, duration, date, imageUrl, description, _id } = destination;
    
    // Control open state for auto-closing after update
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Convert raw ISO date string to a HeroUI CalendarDate object
    const parsedDate = date ? parseDate(date) : null;

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const updatedDestination = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedDestination)
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Update success:", data);
                setIsOpen(false); // Auto-close modal after successful submit
            } else {
                console.error("Failed to update destination");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Modal.Trigger>
                <button 
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    <FiEdit className="text-xs" /> Edit
                </button>
            </Modal.Trigger>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl w-full">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Destination</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-4 sm:p-6">
                            <Surface variant="default" className="rounded-xl">
                                <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-6 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Destination Name */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={destinationName} name="destinationName" isRequired>
                                                <Label>Destination Name</Label>
                                                <Input placeholder="Bali Paradise" className="rounded-xl w-full" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Country */}
                                        <TextField defaultValue={country} name="country" isRequired>
                                            <Label>Country</Label>
                                            <Input placeholder="Indonesia" className="rounded-xl w-full" />
                                            <FieldError />
                                        </TextField>

                                        {/* Category */}
                                        <div>
                                            <Select
                                                defaultSelectedKey={category}
                                                name="category"
                                                isRequired
                                                className="w-full"
                                                placeholder="Select category"
                                            >
                                                <Label>Category</Label>
                                                <Select.Trigger className="rounded-xl w-full">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox>
                                                        <ListBox.Item id="Beach" textValue="Beach">Beach <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Mountain" textValue="Mountain">Mountain <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="City" textValue="City">City <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="City Break" textValue="City Break">City Break <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Adventure" textValue="Adventure">Adventure <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Cultural" textValue="Cultural">Cultural <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Historical" textValue="Historical">Historical <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Luxury" textValue="Luxury">Luxury <ListBox.ItemIndicator /></ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Price */}
                                        <TextField defaultValue={price} name="price" type="number" isRequired>
                                            <Label>Price (USD)</Label>
                                            <Input
                                                type="number"
                                                placeholder="1299"
                                                className="rounded-xl w-full"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Duration */}
                                        <TextField defaultValue={duration} name="duration" isRequired>
                                            <Label>Duration</Label>
                                            <Input
                                                placeholder="7 Days / 6 Nights"
                                                className="rounded-xl w-full"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Departure Date */}
                                        <div className="md:col-span-2">
                                            <TextField name="departureDate" isRequired>
                                                <Label>Departure Date</Label>
                                                <DatePicker className="w-full" name="date" defaultValue={parsedDate}>
                                                    <DateField.Group fullWidth className="w-full">
                                                        <DateField.Input>
                                                            {(segment) => <DateField.Segment segment={segment} />}
                                                        </DateField.Input>
                                                        <DateField.Suffix>
                                                            <DatePicker.Trigger>
                                                                <DatePicker.TriggerIndicator>
                                                                    <Icon className="size-4" icon="gravity-ui:chevron-down" />
                                                                </DatePicker.TriggerIndicator>
                                                            </DatePicker.Trigger>
                                                        </DateField.Suffix>
                                                    </DateField.Group>
                                                    <DatePicker.Popover>
                                                        <Calendar aria-label="Event date">
                                                            <Calendar.Header>
                                                                <Calendar.YearPickerTrigger>
                                                                    <Calendar.YearPickerTriggerHeading />
                                                                    <Calendar.YearPickerTriggerIndicator />
                                                                </Calendar.YearPickerTrigger>
                                                                <Calendar.NavButton slot="previous" />
                                                                <Calendar.NavButton slot="next" />
                                                            </Calendar.Header>
                                                            <Calendar.Grid>
                                                                <Calendar.GridHeader>
                                                                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                                </Calendar.GridHeader>
                                                                <Calendar.GridBody>
                                                                    {(date) => <Calendar.Cell date={date} />}
                                                                </Calendar.GridBody>
                                                            </Calendar.Grid>
                                                            <Calendar.YearPickerGrid>
                                                                <Calendar.YearPickerGridBody>
                                                                    {({ year }) => <Calendar.YearPickerCell year={year} />}
                                                                </Calendar.YearPickerGridBody>
                                                            </Calendar.YearPickerGrid>
                                                        </Calendar>
                                                    </DatePicker.Popover>
                                                </DatePicker>
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Image URL */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
                                                <Label>Image URL</Label>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/bali-paradise.jpg"
                                                    className="rounded-xl w-full"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={description} name="description" isRequired>
                                                <Label>Description</Label>
                                                <TextArea
                                                    placeholder="Describe the travel experience..."
                                                    className="rounded-xl w-full min-h-[100px]"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl py-3 transition-colors cursor-pointer"
                                    >
                                        {isSubmitting ? "Updating..." : "Update Destination"}
                                    </Button>
                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button 
                                type="button" 
                                variant="secondary" 
                                className="rounded-xl cursor-pointer"
                                onPress={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}