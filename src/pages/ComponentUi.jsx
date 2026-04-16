import React, { useState } from "react";
import Button from "../components/ui/Button";
import ButtonIcon from "../components/ui/ButtonIcon";
import InputField from "../components/ui/InputField";
import CheckBox from "../components/ui/CheckBox";
import Notification from "../components/ui/Notification";
import Toggle from "../components/ui/Toggle";
import Dropdown from "../components/ui/Dropdown";
import Badge from "../components/ui/Badge";
import Table from "../components/table/Table";
import { faPlus, faLock, faStar } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

const ComponentUi = () => {
  const [cb1, setCb1] = useState(false);
  const [cb2, setCb2] = useState(true);
  const [cb3, setCb3] = useState(false);
  const [cb4, setCb4] = useState(false);

  const [tog, setTog] = useState(false);

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);

  const tableColumns = [
    {
      header: "Status",
      accessor: "status",
      render: (status) => {
        let color = "default";
        if (status === "Paid") color = "success";
        else if (status === "Overdue") color = "warning";
        else if (status === "Draft") color = "neutral";
        
        return <Badge label={status} color={color} size="small" />;
      },
    },
    { header: "Date", accessor: "date", sortable: true },
    { header: "Number", accessor: "number" },
    { header: "Customer", accessor: "customer" },
    { header: "Total", accessor: "total" },
  ];

  const tableData = [
    { status: "Paid", date: "23.05.2023", number: "#054", customer: "Jane Cooper", total: "$2800" },
    { status: "Paid", date: "23.05.2023", number: "#054", customer: "Esther Howard", total: "$2800" },
    { status: "Draft", date: "23.05.2023", number: "#054", customer: "Cameron Williamson", total: "$2800" },
    { status: "Paid", date: "23.05.2023", number: "#054", customer: "Brooklyn Simmons", total: "$2800" },
    { status: "Overdue", date: "23.05.2023", number: "#054", customer: "Leslie Alexander", total: "$2800" },
    { status: "Overdue", date: "23.05.2023", number: "#054", customer: "Arlene McCoy", total: "$2800" },
  ];

  return (
    <div>
      <div className="p-10 space-y-4 h-1000">
        <div className="grid grid-cols-2 gap-10 w-1/2">
          <div className="flex flex-col gap-5">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <p>Paragraph</p>
          </div>
        </div>

        {/* BUTTON COMPONENT */}
        <div>
          <div className="grid gap-4">
            <h2>Button Component</h2>
            <h4>Primary Button</h4>
            {/* BUTTON PRIMARY */}
            <div className="flex gap-4 items-center">
              <Button
                variant="primary"
                label="Large"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />
              <ButtonIcon size="large" />
              <Button
                variant="primary"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />
              <ButtonIcon size="medium" />
              <Button
                variant="primary"
                label="Small"
                size="small"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />
              <ButtonIcon size="small" />
            </div>
          </div>

          {/* BUTTON OUTLINE */}
          <div className="grid gap-4">
            <h4>Outline Button</h4>
            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                label="Large"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <ButtonIcon variant="outline" size="large" />

              <Button
                variant="outline"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <ButtonIcon variant="outline" size="medium" />

              <Button
                variant="outline"
                label="Small"
                size="small"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <ButtonIcon variant="outline" size="small" />
            </div>
          </div>

          {/* BUTTON CLEAN */}
          <div className="grid gap-4">
            <h4>Clean Button</h4>
            <div className="flex gap-4 items-center">
              <Button
                variant="clean"
                label="Large"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <ButtonIcon variant="clean" size="large" />

              <Button
                variant="clean"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <ButtonIcon variant="clean" size="medium" />

              <Button
                variant="clean"
                label="Small"
                size="small"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <ButtonIcon variant="clean" size="small" />
            </div>
          </div>

          {/* BUTTON DISABLED */}
          <div className="grid gap-4">
            <h4>Disabled Button</h4>
            <div className="flex gap-4 items-center">
              <Button
                variant="primary"
                label="Large"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
                disabled={true}
              />

              <ButtonIcon variant="primary" disabled={true} size="large" />

              <Button
                variant="outline"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
                disabled={true}
              />

              <ButtonIcon variant="outline" disabled={true} size="medium" />

              <Button
                variant="clean"
                label="Small"
                size="small"
                leftIcon={faPlus}
                rightIcon={faPlus}
                disabled={true}
              />
              <ButtonIcon variant="clean" disabled={true} size="small" />
            </div>
          </div>
        </div>

        {/* INPUT FIELD */}
        <div className="">
          <h2>Input Field</h2>
          <div className="grid grid-cols-4 gap-20 items-center">
            {/* LARGE OUTLINE */}
            <div className="grid">
              <InputField
                style="outline"
                state="default"
                label="Default"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="field"
                label="Field"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="focus"
                label="Focus"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="disable"
                label="Disable"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="success"
                label="Success"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="warning"
                label="Warning"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="error"
                label="Error"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />
            </div>

            {/* LARGE FILL */}
            <div className="grid">
              <InputField
                style="fill"
                state="default"
                label="Default"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="field"
                label="Field"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="focus"
                label="Focus"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="disable"
                label="Disable"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="success"
                label="Success"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="warning"
                label="Warning"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="error"
                label="Error"
                size="large"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />
            </div>

            {/* MEDIUM OUTLINE */}
            <div className="grid">
              <InputField
                style="outline"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="field"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="focus"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="disable"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="success"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="warning"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="outline"
                state="error"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />
            </div>

            {/* MEDIUM FILL */}
            <div className="grid">
              <InputField
                style="fill"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="field"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="focus"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="disable"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="success"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="warning"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />

              <InputField
                style="fill"
                state="error"
                label="Medium"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
              />
            </div>

            {/* PASSWORD INPUT */}

            <InputField
              state="default"
              style="outline"
              label="Password"
              placeholder="Masukkan password"
              leftIcon={faLock}
              isPassword={true}
            />

            <InputField
              state="focus"
              style="fill"
              label="Password"
              placeholder="Masukkan password"
              leftIcon={faLock}
              isPassword={true}
            />
          </div>
        </div>

        {/* CHECK BOX */}
        <div>
          <h2>Check Box</h2>
          <div className="mt-4 flex gap-10">
            <div className="flex flex-col gap-4">
              <h4>Medium</h4>
              <CheckBox
                label="Unselected"
                checked={cb1}
                onChange={(e) => setCb1(e.target.checked)}
              />
              <CheckBox
                label="Selected"
                checked={cb2}
                onChange={(e) => setCb2(e.target.checked)}
              />
              <CheckBox label="Indeterminate" indeterminate={true} />
              <CheckBox label="Disabled" checked={true} disabled={true} />
              <CheckBox label="Read Only" checked={true} readOnly={true} />
            </div>

            <div className="flex flex-col gap-4">
              <h4>Large</h4>
              <CheckBox
                label="Unselected"
                size="large"
                checked={cb3}
                onChange={(e) => setCb3(e.target.checked)}
              />
              <CheckBox
                label="Selected"
                size="large"
                checked={cb4}
                onChange={(e) => setCb4(e.target.checked)}
              />
              <CheckBox
                label="Indeterminate"
                size="large"
                indeterminate={true}
              />
              <CheckBox
                label="Disabled"
                size="large"
                checked={true}
                disabled={true}
              />
              <CheckBox
                label="Read Only"
                size="large"
                checked={true}
                readOnly={true}
              />
            </div>
          </div>
        </div>

        {/* BANNER NOTIFICATION */}
        <div className="flex flex-col gap-4">
          <h2>Banner Notification</h2>
          <div className="grid grid-cols-2 gap-4">
          <Notification
            title="Title"
            message="Message"
            variant="default"
            showClose={true}
            onClose={() => {}}
          />

          <Notification
            title="Title"
            message="Message"
            variant="info"
            showClose={true}
            onClose={() => {}}
          />

          <Notification
            title="Title"
            message="Message"
            variant="success"
            showClose={true}
            onClose={() => {}}
          />

          <Notification
            title="Title"
            message="Message"
            variant="warning"
            showClose={true}
            onClose={() => {}}
          />

          <Notification
            title="Title"
            message="Message"
            variant="error"
            showClose={true}
            onClose={() => {}}
          />
          </div>
        </div>

        {/* TOGGLE */}
        <div className="grid gap-2">
          <h2>Toggle</h2>
          <div className=" flex gap-x-4">
          <Toggle
            label="Placeholder"
            state="default"
            checked={tog}
            onChange={setTog}
            onHold={({ checked }) => console.log("hold", checked)}
          />

          <Toggle
            checked={false}
            onChange={() => {}}
            label="Placeholder"
            disabled
          />
          </div>
        </div>

        {/* DROPDOWN */}
        <div className="grid gap-2">
          <h2>Dropdown</h2>
          <div className="grid grid-cols-2 gap-4">
          <Dropdown
            placeholder="Select an option"
            helperText="Helper Text"
            showCheckbox={true}
            showSearch={true}
            leftIcon={faPlus}
            showItemIcons={true}
            options={[
              { value: "option1", label: "Option 1", icon: faStar },
              { value: "option2", label: "Option 2", icon: faStar },
              { value: "option3", label: "Option 3", icon: faStar },
            ]}
            value={value1}
            onChange={setValue1}
            disabled={false}
            showLeftIcon={true}
            showHelperText={true}
            id="dropdown"
            className="w-full"
          />

          <Dropdown
            placeholder="Select an option"
            helperText="Helper Text"
            showCheckbox={true}
            showSearch={true}
            leftIcon={faPlus}
            showItemIcons={true}
            options={[
              { value: "option1", label: "Option 1", icon: faStar },
              { value: "option2", label: "Option 2", icon: faStar },
              { value: "option3", label: "Option 3", icon: faStar },
            ]}
            value={value2}
            onChange={setValue2}
            disabled={false}
            showHelperText={false}
            id="dropdown"
            className="w-full"
          />
          
          <Dropdown
            placeholder="Select an option"
            helperText="Helper Text"
            showCheckbox={true}
            showSearch={false}
            showLeftIcon={false}
            showItemIcons={true}
            options={[
              { value: "option1", label: "Option 1", icon: faStar },
              { value: "option2", label: "Option 2", icon: faStar },
              { value: "option3", label: "Option 3", icon: faStar },
            ]}
            value={value3}
            onChange={setValue3}
            disabled={false}
            showHelperText={false}
            id="dropdown"
            className="w-full"
          />

          <Dropdown
            placeholder="Select an option"
            helperText="Helper Text"
            showCheckbox={true}
            showSearch={false}
            showLeftIcon={false}
            showItemIcons={false}
            options={[
              { value: "option1", label: "Option 1"},
              { value: "option2", label: "Option 2"},
              { value: "option3", label: "Option 3"},
            ]}
            value={value4}
            onChange={setValue4}
            disabled={false}
            showHelperText={false}
            id="dropdown"
            className="w-full"
          />

          <Dropdown
            placeholder="Select an option"
            helperText="Helper Text"
            showCheckbox={false}
            showSearch={false}
            showLeftIcon={false}
            showItemIcons={false}
            options={[
              { value: "option1", label: "Option 1"},
              { value: "option2", label: "Option 2"},
              { value: "option3", label: "Option 3"},
            ]}
            value={value5}
            onChange={setValue5}
            disabled={false}
            showHelperText={false}
            id="dropdown"
            className="w-full"
          />

          <Dropdown
            placeholder="Select an option"
            helperText="Helper Text"
            showCheckbox={true}
            showSearch={false}
            showLeftIcon={false}
            showItemIcons={false}
            value={value3}
            onChange={setValue3}
            disabled={true}
            showHelperText={false}
            id="dropdown"
            className="w-full"
          />
          </div>
        </div>

        <div>
            <h2>Badge</h2>
            <div className="grid grid-cols-2 gap-4">
                <Badge
                label="Default"
                color="default"
                variant="solid"
                size="medium"
                leftIcon={faPlus}
                rightIcon={faPlus}
                />
                <Badge
                label="Neutral"
                color="neutral"
                variant="solid"
                size="medium"
                />
                <Badge
                label="Info"
                color="info"
                variant="solid"
                size="medium"
                />
                <Badge
                label="Success"
                color="success"
                variant="solid"
                size="medium"
                />
                <Badge
                label="Warning"
                color="warning"
                variant="solid"
                size="medium"
                />
                <Badge
                label="Error"
                color="error"
                variant="solid"
                size="medium"
                />
                {/* Outline */}
                <Badge
                label="Default"
                color="default"
                variant="outline"
                size="medium"
                />
                <Badge
                label="Neutral"
                color="neutral"
                variant="outline"
                size="medium"
                />
                <Badge
                label="Info"
                color="info"
                variant="outline"
                size="medium"
                />
                <Badge
                label="Success"
                color="success"
                variant="outline"
                size="medium"
                />
                <Badge
                label="Warning"
                color="warning"
                variant="outline"
                size="medium"
                />
                <Badge
                label="Error"
                color="error"
                variant="outline"
                size="medium"
                />
            </div>
        </div>

        {/* TABLE COMPONENT */}
        <div>
          <h2>Table</h2>
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm mt-4">
            <Table 
            columns={tableColumns} 
            data={tableData}
            isLoading={false}
            pagination={{
              currentPage: 1,
              totalPages: 5,
              onPageChange: (page) => console.log(page),
            }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentUi;